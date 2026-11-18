# NetFlo Download Manager — Architecture Documentation

## 1. Overview

**NetFlo** is a multi-connection download accelerator and manager built on Electron, React, and Node.js. It boosts file download speeds by dynamically aggregating bandwidth across all active, physically distinct network adapters (such as Wi-Fi, Ethernet, and USB-tethered cellular connections).

---

## 2. Process Architecture

NetFlo operates on Electron's standard multi-process model:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Electron Main Process                       │
│  - Network Adapter Discovery & Monitoring                       │
│  - Download Manager & Transfer Controllers                      │
│  - HTTP Range Engine / WebTorrent / NZB Engine                  │
│  - Native FFI (Koffi: socket binding, sparse files)             │
│  - Persistent Settings & Database Store                         │
└────────────────┬───────────────────────────────▲────────────────┘
                 │ IPC (ContextBridge)           │ IPC
┌────────────────▼───────────────────────────────┴────────────────┐
│                     Preload Layer (Sandbox)                     │
│  - Exposes typed `window.netflo` API bridge                     │
│  - Event dispatchers and channel filtering                      │
└────────────────┬───────────────────────────────▲────────────────┘
                 │                               │
┌────────────────▼───────────────────────────────┴────────────────┐
│                    Chromium Renderer (UI)                       │
│  - React 19 UI with Tailwind CSS                                │
│  - Zustand State Stores (transfers, adapters, settings)         │
│  - Live throughput and per-adapter bandwidth charts             │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 Main Process (`src/main`)
- **Lifecycle & Windows** (`src/main/index.ts`): Initializes application windows, handles single-instance locks, system tray integration, and graceful shutdown.
- **Network Engine** (`src/main/network/`):
  - `deviceBinding.ts`: Uses native FFI (`koffi`) to bind outbound TCP sockets to specific network interfaces.
  - Interrogates local network adapters across Windows (`GetAdaptersAddresses`), macOS (`scutil`), and Linux (`ip route`).
- **Download Engines** (`src/main/download/`):
  - **HTTP Direct Downloads**: Splits files into byte ranges and coordinates parallel streams across available adapters.
  - **BitTorrent**: Manages peer allocations across distinct network interfaces.
  - **Usenet NZB**: Multiplexes NNTP article streams across distinct connections.
- **Auto-Updater** (`src/main/updater.ts`): Integrates with GitHub Releases to provide seamless update notifications and downloads.

### 2.2 Preload Layer (`src/preload`)
- Safely exposes IPC channels to the renderer via `contextBridge.exposeInMainWorld('netflo', ...)`.
- Isolates Node.js runtime internals from the web view.

### 2.3 Renderer (`src/renderer`)
- Built with React 19, TypeScript, and Tailwind CSS.
- Real-time updates driven by Electron IPC push events.

---

## 3. Multi-Network Aggregation Mechanism

### 3.1 HTTP Direct Download Range Splitting
For standard HTTP/HTTPS downloads:
1. **Range Support Probe**: NetFlo issues a `HEAD` request to verify whether the server supports the `Accept-Ranges: bytes` header.
2. **Chunk Scheduling**: The file is segmented into discrete byte blocks (e.g., 4MB–16MB).
3. **Multi-Interface Worker Pool**:
   - Each active network adapter is assigned dedicated worker streams.
   - Sockets are explicitly bound to the adapter's local IP address using native socket options (`IP_UNICAST_IF` on Windows, `SO_BINDTODEVICE` on Linux).
   - Fast connections pull new chunks as soon as previous chunks complete, naturally balancing load according to real-time throughput.
4. **End-Game Racing**: When a download nears completion, slow or stalled chunks are redundantly requested across idle connections; the first to complete is accepted and duplicates are discarded.
5. **Direct Disk Assembly**: Chunks are written directly into pre-allocated sparse files on disk, preventing memory bloat.

### 3.2 BitTorrent Peer Distribution
- BitTorrent traffic is distributed by round-robining peer connections across active interfaces.
- NetFlo prevents single-adapter saturation by tracking per-interface peer counts.

### 3.3 Usenet NZB Multi-Stream Distribution
- NNTP connection pools are split evenly across available interfaces.
- Each article is streamed and assembled directly into the destination file.

---

## 4. Scope and System Boundary

- **In Scope (NetFlo Download Manager)**:
  - Multi-connection HTTP, HTTPS, Torrent, and NZB download acceleration.
  - Direct network interface binding for its own downloads without requiring third-party drivers or VPNs.
  - Browser extensions (Chrome/Firefox) to intercept downloads and pass sessions to NetFlo.
- **Out of Scope (Standalone NetFlo Engine)**:
  - System-wide proxying and Layer 3 packet capture for third-party games (e.g., Steam, Epic Games).
  - Virtual TAP/Wintun adapter creation.
  *(These capabilities are handled by the companion NetFlo Engine repository).*

---

## 5. Build and Packaging Pipeline

| Command | Purpose | Output |
|---|---|---|
| `npm run dev` | Starts Vite dev server with Electron hot reload | Development |
| `npm run build` | Compiles TypeScript and builds bundles | `out/` |
| `npm run build:win` | Packages Windows NSIS installer | `dist/*.exe` |
| `npm run build:mac` | Packages macOS DMG & ZIP | `dist/*.dmg`, `dist/*.zip` |
| `npm run build:linux`| Packages Linux AppImage, deb, rpm | `dist/*.AppImage`, etc. |
| `npm run build:extension` | Compiles browser integration extensions | `extension/dist/` |

---

## 6. Upstream Attribution

NetFlo Download Manager is derived from the open-source project [Plexo](https://github.com/anmolkapil/plexo) by Anmol Kapil under the MIT License. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for full licensing details.
