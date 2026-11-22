# NetFlo — Git History and Contributor Provenance Audit

**Document Date:** November 18, 2026 (Final Verification)  
**Auditor:** Antigravity AI Engineering Assistant  
**Repository:** [VHARD6/NetFlo](https://github.com/VHARD6/NetFlo.git)  
**Local Working Copy:** `C:\Users\omras\.gemini\antigravity\scratch\plexo-repo`  
**Status:** Read-Only Technical Audit Report (Documentation Only — No Git history or branch modifications)

---

## 1. Executive Summary & Strategic Baseline

This audit provides an exhaustive examination of the Git history, contributor attribution mechanics, and technical capabilities of the **NetFlo** project.

### 1.1 Final Strategic Decision
The strategic path for NetFlo is established:
1. **NetFlo Download Manager (`VHARD6/NetFlo`)**: Preserve the complete upstream Git commit history from the MIT-licensed Plexo project on the `main` branch without squashing, rebasing, or rewriting commits.
2. **NetFlo Standalone Engine (`scratch/NetFlo`)**: Maintain this engine in a separate, dedicated repository with its own independent development history, reflecting its distinct codebase and zero inheritance from Plexo.
3. **No History Modification**: No commits will be deleted, squashed, rebased, or moved.

---

## 2. Verified Git History, API Reconciliation & Contributor Statistics

### 2.1 Git Shortlog & Commit Count Verification
Executing the core Git history inspection commands on `HEAD` yields the following verified totals:

```powershell
git rev-list --count HEAD                # -> 335
git rev-list --count --no-merges HEAD     # -> 308
git rev-list --count --min-parents=2 HEAD # -> 27
```

- **Total Commits on `HEAD`**: Exactly **335**.
- **Non-Merge Commits**: **308**.
- **Merge Commits**: **27** (all created by GitHub pull request merges using committer `GitHub <noreply@github.com>`).
- **Inherited Plexo Commits**: **333** (from root commit `14c57aa` to upstream commit `8387f93`).
- **NetFlo Commits**: **2** (`d11c8a6` and `2d5e487` by Om / `@VHARD6`).

---

### 2.2 Complete Author Identity Breakdown (`git shortlog -sne HEAD`)
Running `git shortlog -sne HEAD` produces **26 distinct contributor rows**. Summing every individual row yields **exactly 335 commits** with zero omissions:

| # | Commits | Author Name | Author Email | Notes |
|---|---|---|---|---|
| 1 | 165 | Anmol Kapil | `aanmolkapil@gmail.com` | Upstream Plexo Lead (Primary Email) |
| 2 | 65 | Anmol Kapil | `71038519+anmolkapil@users.noreply.github.com` | Upstream Plexo Lead (GitHub Noreply) |
| 3 | 19 | prashantgeek | `pt15052000@gmail.com` | Upstream Contributor |
| 4 | 15 | Arpit Khandelwal | `arpit.khandelwal2019@vitstudent.ac.in` | Upstream Contributor |
| 5 | 14 | Claude | `noreply@anthropic.com` | Upstream Contributor / AI Pairing |
| 6 | 11 | Rudy Mizrahi Celekli | `47457359+rudycelekli@users.noreply.github.com` | Upstream Contributor |
| 7 | 7 | Ambaliya Prashant Vrajlal | `23dcs002@charusat.edu.in` | Upstream Contributor |
| 8 | 7 | Dhruvil Patel | `121329661+DhruvilPatel603@users.noreply.github.com` | Upstream Contributor |
| 9 | 4 | Muhammadhussein Ammari | `xmha97@gmail.com` | Upstream Contributor |
| 10 | 4 | dxmoc 🐛 | `852@tuta.com` | Upstream Contributor |
| 11 | 3 | Anzy | `136097103+anzydev@users.noreply.github.com` | Upstream Contributor |
| 12 | 3 | yparshant610 | `yparshant610@gmail.com` | Upstream Contributor |
| 13 | 2 | HiteshRohira | `hiteshrohira15@gmail.com` | Upstream Contributor |
| 14 | **2** | **Om** | `omraskar08@gmail.com` | **NetFlo Maintainer (`@VHARD6`)** |
| 15 | 2 | Prashant Tiwari | `65226376+prashantGeek@users.noreply.github.com` | Upstream Contributor |
| 16 | 2 | kevin | `5299031+kevin9327@users.noreply.github.com` | Upstream Contributor (Deleted Account) |
| 17 | 1 | Aman Pal | `82009045+AmanDevelops@users.noreply.github.com` | Upstream Contributor |
| 18 | 1 | Andrew Barnes | `169967362+Bortlesboat@users.noreply.github.com` | Upstream Contributor |
| 19 | 1 | Awake | `135691320+awake-devel@users.noreply.github.com` | Upstream Contributor |
| 20 | 1 | Giulio Savini | `giuliosavini@proton.me` | Upstream Contributor |
| 21 | 1 | SITHESWAR K | `sitheswar2005@gmail.com` | Upstream Contributor |
| 22 | 1 | Sahil Dabhi | `80204672+SahilDabhi@users.noreply.github.com` | Upstream Contributor |
| 23 | 1 | Shovith Debnath | `119169431+Hawkay002@users.noreply.github.com` | Upstream Contributor |
| 24 | 1 | Shreyansh Kushwaha | `shreyansh.kushw@gmail.com` | Upstream Contributor |
| 25 | 1 | Wu Shuwen | `mikewushuwen@outlook.com` | Upstream Contributor |
| 26 | 1 | Yashwanth Sai | `ysaimuppineni789@gmail.com` | Upstream Contributor |
| **Sum** | **335** | **25 Names** | **26 Email Identities** | **Total reconciles exactly with `git rev-list`** |

---

### 2.3 GitHub REST API Verification & Reconciling the Metrics

Direct inspection of GitHub's REST API was conducted against the remote repository:

#### 1. API Query Without `anon`
- **Request**: `GET /repos/VHARD6/NetFlo/contributors?per_page=100`
- **Response Status**: `200 OK`
- **Caching Headers**:
  - `ETag: W/"02a4706f090c80201a00f6796f173f054a72c680e587f7f58f048871963b7b2b"`
  - `Cache-Control: public, max-age=60, s-maxage=60`
  - `Last-Modified: Wed, 18 Nov 2026 12:37:35 GMT`
- **Objects Returned**: Exactly **23 user objects** (all `type: "User"`).
- **Sum of Contributions**: **333**.

#### 2. API Query With `anon=true`
- **Request**: `GET /repos/VHARD6/NetFlo/contributors?anon=true&per_page=100`
- **Response Status**: `200 OK` (Served with matching ETag).
- **Objects Returned**: Exactly **23 user objects**.
- **Anonymous Objects Returned**: **0**.
- **Sum of Contributions**: **333**.

#### 3. Investigation of Kevin's Commits (`4995e05` and `c2e8a39`)
- Commits `4995e05` and `c2e8a39` were authored by `kevin <5299031+kevin9327@users.noreply.github.com>`.
- Direct queries to the GitHub Users API:
  - `GET https://api.github.com/users/kevin9327` -> Returns `404 Not Found`.
  - `GET https://api.github.com/user/5299031` -> Returns `404 Not Found`.
- **Finding**: The account `kevin9327` has been deactivated or deleted on GitHub. Because GitHub cannot correlate this author to an existing user profile, and because noreply addresses are excluded from anonymous email parsing, Kevin's 2 commits are **completely absent from both API responses**.
- **Reconciliation**: 333 API contributions + 2 unmapped commits = **335 total commits on `HEAD`**.

---

### 2.4 Reconciliation of the Five Distinct Counting Metrics

The repository presents five numbers across different interfaces, each governed by its own technical logic:

1. **335 Commits on `HEAD`**:
   - The total number of Git commits reachable from the default branch, counted via `git rev-list --count HEAD` (308 non-merge commits + 27 merge commits).
2. **333 Contributions in the REST API**:
   - The total number of commits authored by active, public GitHub accounts on `HEAD` (335 minus 2 commits from the deactivated Kevin account).
3. **27 Contributors Displayed on Web UI**:
   - The GitHub web interface evaluates all distinct email identities across the commit graph on `HEAD`.
   - In Git history, there are **26 unique author email addresses** plus **1 unique committer email address** (`noreply@github.com` from GitHub PR merges) that does not appear in the author list.
   - 26 author emails + 1 distinct committer email = **27 distinct email identities**.
   - Note: Merge commits and empty commits are excluded from the visual graph points.
4. **25 Git Author Names**:
   - Counted via `git shortlog -sn HEAD`. Groups commits purely by the literal string in the `Author:` name field (Anmol Kapil's 230 commits under two emails are grouped into one name row).
5. **26 Git Author Email Identities**:
   - Counted via `git shortlog -sne HEAD`. Groups commits by exact `(Name, Email)` pairs (Anmol Kapil appears as two distinct identity rows: 165 commits via Gmail + 65 commits via GitHub noreply).

---

### 2.5 Individual Profile Contribution Graph ("Green Squares") Rules
Commits appear on an individual user's personal GitHub contribution graph only if **all four** conditions are met:
1. **Email Association**: The author email matches a verified email address added to the individual's GitHub account settings.
2. **Branch Reachability**: The commit is directly reachable from the repository's default branch (`main`) or `gh-pages`.
3. **Commit Exclusions**: The commit is neither a merge commit nor an empty commit.
4. **Repository Relationship Requirement**:
   - The user must hold one of the following recognized relationships to the repository:
     - The user is the **owner** of the repository.
     - The user is a confirmed **collaborator** on the repository.
     - The user has an active interaction history (e.g. opened an accepted pull request or issue).
     - The user has **starred** the repository.
   - **Fork Restriction**: Commits made to a fork do *not* count toward user contribution graphs unless the user owns the parent repository or the commits are merged upstream. Because `VHARD6/NetFlo` is an **independent repository** (`fork: false`), eligible commits count toward personal profiles.

---

## 3. Git History Mechanics & Upstream Synchronization

### 3.1 Purpose and Limitations of `--allow-unrelated-histories`
In Git 2.9.0, `git merge` introduced a safety check to refuse merging branches that share no common ancestor (`fatal: refusing to merge unrelated histories`).
- **Purpose**: Prevents developers from accidentally merging two unrelated repositories or disconnected histories. Passing `--allow-unrelated-histories` explicitly tells Git to bypass this safety check.
- **Limitations**: Bypassing the check does not resolve the three-way merge problem. A three-way merge requires a common ancestor (`merge-base`) to identify changes. When histories are unrelated, `git merge-base` returns empty. Git is forced to treat the base as an empty tree, causing it to compare all files from both branches simultaneously. Every file that exists in both branches with differing content is treated as a concurrent addition with conflicting contents, resulting in project-wide merge conflicts across hundreds of files.

### 3.2 Cherry-Picking Mechanics
- **Shared Ancestry is NOT Required**: `git cherry-pick <commit>` applies the diff introduced by a single commit onto the current branch. It does not inspect whether the commit and `HEAD` share a common ancestor.
- **Patch Context Dependency**: Whether a cherry-pick applies cleanly depends strictly on:
  1. The existence of the target file at the expected path.
  2. The exact match of surrounding context lines (typically 3 lines before and after in unified diffs).
  3. Whether the target lines have been modified differently in `HEAD`.

### 3.3 Advantages of Preserving Shared Ancestry
Retaining the full upstream commit history on `main` provides decisive long-term maintenance benefits:
1. **Native Three-Way Merges**: `git merge upstream/main` and `git rebase upstream/main` calculate an accurate `merge-base`, automatically ignoring all commits that both branches already share.
2. **Automated Upstream Tracking**: Tools like `git cherry` and `git log --cherry-mark` automatically detect which upstream bug fixes and security patches have already been integrated.
3. **Conflict Minimization**: Merge conflicts are restricted solely to lines modified by both NetFlo and upstream Plexo since the fork point (`8387f93`), rather than triggering tree-wide collisions.
4. **Tooling Attribution**: `git blame` and IDE annotation tools trace every single line of inherited code to its original author, maintaining accurate historical auditability.

---

## 4. Standalone Engine Technical Verification & Architecture

The technical capabilities of the Standalone Engine (`scratch/NetFlo`) are evaluated against foundational networking principles:

### 4.1 Networking Classification: Three Distinct Modes
1. **Per-Connection Network Selection**:
   - Directs an entire discrete TCP or UDP socket to exit through a specific network interface (e.g., via `setsockopt` with `IP_UNICAST_IF` on Windows).
   - Each socket is permanently bound to exactly one physical adapter.
2. **Multi-Connection Bandwidth Aggregation**:
   - Opens *multiple concurrent independent TCP connections* (e.g., parallel HTTP Range chunks, BitTorrent peer swarms) and distributes them across different network adapters.
   - Aggregate throughput is the sum of the individual connection speeds. However, any single connection cannot exceed the bandwidth of its assigned adapter.
3. **Single-Flow Multipath Bonding (Packet-Level / MPTCP / Channel Bonding)**:
   - Splits a *single logical TCP/IP flow* across multiple physical paths simultaneously.
   - Requires either end-to-end Multipath TCP (RFC 8684) supported by both client and server, or a dual-ended tunnel with a remote aggregation server/VPS (e.g. OpenMPTCProuter, Speedify) to resequence packets before delivering them to the destination.

---

### 4.2 Standalone Engine SOCKS5 Dispatcher Reality
- **Scope**: The SOCKS5 proxy in `src/main/network/socks5Server.ts` and `src/main/network/dispatcher.ts` operates strictly at the **Per-Connection Network Selection** level.
- **Behavior**: When a client application connects to `127.0.0.1:1080` and issues a `CONNECT` command, NetFlo binds that outbound TCP socket to a specific network adapter index (`ifIndex`) using Round-Robin or Failover dispatch.
- **Limitation**: The proxy **CANNOT split or bond a single logical TCP connection**. A single large file downloaded over one HTTP connection or a single game stream runs solely across one adapter at that adapter's individual speed.

---

### 4.3 Scope of WinINet System Proxy Settings
- `src/main/network/systemProxy.ts` modifies `HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings` (`ProxyEnable = 1`, `ProxyServer = socks=127.0.0.1:1080`) and calls `InternetSetOption`.
- **Scope**: This setting affects **only applications that actively consult Windows Internet Settings** (e.g., Microsoft Edge, Google Chrome, WinINet/WinHTTP-based utilities).
- **Limitation**: Applications that bypass WinINet—such as applications utilizing raw Winsock sockets, custom libcurl implementations without system proxy detection, or games communicating over direct UDP—ignore WinINet settings completely and route according to the default Windows routing table.

---

### 4.4 Functional Requirements for Wintun Layer 3 Bonding
The current implementation in `src/main/network/wintun.ts` loads the signed `wintun.dll` driver, creates a virtual adapter (`NetFlo`), and opens a ring buffer session. To transform this into a functional bonding solution requires substantial additional systems engineering:

1. **Userspace IP Stack & TCP Reassembly**: A TUN adapter delivers raw Layer 3 IP packets. NetFlo must implement or bundle an IP stack (e.g., lwIP) to parse IP/TCP/UDP headers, maintain a NAT connection-tracking table, handle TCP ACKs, and recalculate checksums.
2. **Packet Encapsulation**: Outbound packets must be encapsulated into tunnel envelopes (e.g., UDP datagrams) and directed across specific physical interfaces.
3. **Remote Aggregation Server (Dual-Ended Requirement)**:
   - Destination servers on the public Internet (Steam CDNs, game servers, web servers) expect all packets for a given TCP connection to arrive from a single public IP address with contiguous TCP sequence numbers.
   - If NetFlo sends raw packets belonging to the same connection directly out of both a home Wi-Fi IP and a cellular carrier IP, destination firewalls will drop the packets due to Reverse Path Filtering (RPF) and IP mismatch.
   - **A remote aggregation VPS is mandatory**: The VPS receives encapsulated packets from both connections, reassembles them, forwards them to the destination from a single public IP, and demultiplexes response packets back over both paths.

---

### 4.5 Steam & Epic Games Acceleration Status
- **STATUS: UNVERIFIED / NO TEST EVIDENCE**.
- Neither Steam nor Epic Games multi-adapter acceleration has been verified in controlled benchmarks.
- Steam's content delivery client uses multi-threaded HTTP chunking that frequently bypasses system proxy settings unless specific command-line switches or transparent LSP/WFP redirection are employed.
- **No speedup claims may be made** until repeatable, instrumented benchmarks comparing single-adapter vs dual-adapter download speeds are completed and published with reproducible test scripts.

---

## 5. Comprehensive Test Evidence & Verification Matrix

Capabilities across both repositories are classified strictly by test evidence:

- **Unit Test**: Automated test asserting isolated function logic.
- **Mocked Integration Test**: Automated test running against local mocked servers or emulated interfaces.
- **Local Integration Test**: Test validating real component execution locally (e.g. headless Electron, local socket handshake).
- **Real Multi-Network Benchmark**: Controlled live throughput test measuring aggregate bandwidth across two or more active, physically distinct internet connections under load.

### 5.1 NetFlo Download Manager (`plexo-repo`)

| Capability | Primary Source Files | Verification Status | Specific Test & Environment | Evidence Available |
|---|---|---|---|---|
| **HTTP Range Chunking** | `src/main/download/http/`<br>`src/main/network/deviceBinding.ts`<br>`src/main/download/sparseFile.ts` | **Implemented & Integration Tested** | `e2e/download.spec.ts`<br>Playwright test with local mock HTTP server; validates byte-range requests and chunk assembly. | **Yes (Mocked Integration)**. No automated multi-network hardware benchmark exists in CI. |
| **BitTorrent Multi-Interface** | `src/main/download/torrent/` | **Implemented & Integration Tested** | `e2e/torrent.spec.ts`<br>Playwright test with mock local WebTorrent peer swarm. | **Yes (Mocked Integration)**. Distributes peer sockets; real-world multi-ISP swarm performance unbenchmarked. |
| **Usenet NZB Streaming** | `src/main/download/nzb/` | **Implemented & Integration Tested** | `e2e/nzb.spec.ts`<br>Playwright test with local mock NNTP server; validates article assembly. | **Yes (Mocked Integration)**. Multi-stream splitting verified against mock NNTP. |
| **Browser Extension** | `extension/` | **Implemented & Build Tested** | `extension/build.mjs`<br>TypeScript compilation & manifest v3 build check. | **Yes (Build Verification)**. Unpacked extension builds error-free. |

---

### 5.2 NetFlo Standalone Engine (`scratch/NetFlo`)

| Capability | Primary Source Files | Verification Status | Specific Test & Environment | Evidence Available |
|---|---|---|---|---|
| **WCM Group Policy Patch** | `src/main/fixes/wcmFix.ts` | **Implemented & Verified (Registry)** | Manual verification: queried `HKLM\Software\Policies\Microsoft\Windows\WcmSvc\GroupPolicy\fMinimizeConnections`. | **Yes (Registry State)**. Verified registry value set to `0`; stops Windows from disconnecting Wi-Fi on USB tether. |
| **Winsock `IP_UNICAST_IF` FFI** | `src/main/network/windowsBinding.ts` | **Implemented & Verified (Socket Bind)** | Runtime check: Koffi calls `setsockopt(s, IPPROTO_IP, IP_UNICAST_IF, ...)` into `ws2_32.dll`. | **Yes (Local FFI)**. Verified call returns `0` (success). Dual-ISP aggregate throughput unbenchmarked. |
| **USB Metric Normalization** | `src/main/fixes/metricFix.ts` | **Implemented & Verified (Command)** | Shell execution check: runs `netsh interface ipv4 set interface <ifIndex> metric=35`. | **Yes (Command Execution)**. Verified metric assigned to NDIS adapters. |
| **Killer Suite Detection** | `src/main/fixes/killerDetect.ts` | **Implemented & Verified (Service)** | Service query check: runs `sc.exe query KNSrv`. | **Yes (Service Query)**. Verified detection of Killer Network Service. |
| **SOCKS5 Proxy & Dispatcher** | `src/main/network/socks5Server.ts`<br>`src/main/network/dispatcher.ts` | **Implemented & Verified (Local Handshake)** | Local socket test: connected client to `127.0.0.1:1080` and completed SOCKS5 authentication. | **Yes (Protocol Handshake)**. Operates at per-connection level; cannot bond single flows. |
| **WinINet System Proxy** | `src/main/network/systemProxy.ts` | **Implemented & Verified (Registry & API)** | Verified registry key `ProxyEnable = 1` and `InternetSetOption` return value. | **Yes (Registry & API)**. Bypassed by non-WinINet applications. |
| **Steam / Epic Games Acceleration** | `src/main/network/systemProxy.ts`<br>`src/main/network/socks5Server.ts` | **Unverified / Experimental Hypothesis** | **None.** No benchmark or integration test exists. | **NO TEST EVIDENCE.** Unverified under live multi-adapter load. |
| **Wintun Layer 3 TUN Driver** | `src/main/network/wintun.ts` | **Experimental (Incomplete Stack)** | Driver initialization check: loads signed `wintun.dll` and creates adapter handle. | **Partial (Driver Init Only)**. Lacks userspace TCP/IP reassembly and remote aggregation server. Cannot route traffic. |
| **Electron UI & Lifecycle** | `src/main/index.ts`<br>`src/main/preload.ts`<br>`src/renderer/` | **Implemented & Integration Tested** | Headless Electron test: renders `13,644` bytes HTML error-free; verified second-instance restore. | **Yes (Headless Runtime)**. Blank screen and window restore bugs resolved. |

---

## 6. Remaining Verification Gaps

Before NetFlo makes public performance claims, the following verification gaps must be addressed:

1. **Dual-Network Live Throughput Benchmarks**:
   - Establish an instrumented test environment with two active, independent physical uplinks (e.g., Ethernet/Wi-Fi router + 5G USB tethering).
   - Conduct structured A/B download tests comparing single-adapter throughput vs. aggregated multi-adapter throughput under identical network conditions.
2. **Game Launcher Proxy Compatibility Tests**:
   - Quantify whether Steam and Epic Games client downloads route through the local SOCKS5 proxy when the WinINet proxy is active, noting which launch flags (e.g. `-tcp`) are required.
3. **Userspace TUN / Remote VPS Prototype**:
   - If true Layer 3 packet bonding is pursued, develop the userspace LWIP NAT handler and deploy a remote aggregation server endpoint to test packet resequencing across multiple paths.

---

## 7. Final Recommendations & Roadmap

1. **NetFlo Download Manager**:
   - Retain full commit history on `main` at `VHARD6/NetFlo`.
   - Launch NetFlo semantic versioning starting at `v1.0.0`.
   - Maintain a dedicated `CHANGELOG.md` with an explicit line of demarcation: `Changes since Plexo v1.0.0-rc.15`.
2. **NetFlo Standalone Engine**:
   - Publish to a dedicated repository (`VHARD6/NetFlo-Engine`) with its own Git history.
   - Maintain accurate documentation that clearly describes its function as a **Per-Connection SOCKS5 Proxy & WCM Policy Manager**, without claiming single-flow packet bonding or unverified game launcher acceleration.
