/**
 * netfloBridge.ts
 * ─────────────────────────────────────────────────────────────
 * NetFlo Engine Integration Bridge for NetFlo Download Manager.
 *
 * Automatically detects whether the Standalone NetFlo Engine is
 * running locally (on http://127.0.0.1:1088), synchronizes bonded
 * adapter state, and coordinates multi-source stream allocation.
 */

import http from 'node:http';
import { EventEmitter } from 'node:events';
import type { ProxyConfig } from '../../shared/types';

export interface NetFloEngineInfo {
  active: boolean;
  version?: string;
  mode?: string;
  socksPort?: number;
  httpPort?: number;
  bondedAdaptersCount?: number;
  adapters?: Array<{
    ifIndex: number;
    name: string;
    type: string;
    speedMbps: number;
    pingMs: number;
    rxBps: number;
    txBps: number;
  }>;
  totalThroughputBps?: number;
}

export class NetFloBridge extends EventEmitter {
  private engineInfo: NetFloEngineInfo = { active: false };
  private pollTimer: NodeJS.Timeout | null = null;
  private readonly bridgePort: number;

  constructor(bridgePort = 1088) {
    super();
    this.bridgePort = bridgePort;
  }

  start(): void {
    if (this.pollTimer) return;
    this.poll();
    this.pollTimer = setInterval(() => this.poll(), 5000);
  }

  stop(): void {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  getInfo(): NetFloEngineInfo {
    return { ...this.engineInfo };
  }

  isEngineActive(): boolean {
    return this.engineInfo.active;
  }

  /**
   * Returns a SOCKS5 ProxyConfig directed to the NetFlo Engine
   * if active, allowing download streams to route over bonded links.
   */
  getBondedProxy(): ProxyConfig | null {
    if (!this.engineInfo.active || !this.engineInfo.socksPort) return null;
    return {
      type: 'socks5',
      host: '127.0.0.1',
      port: this.engineInfo.socksPort,
    };
  }

  private poll(): void {
    const req = http.get(
      `http://127.0.0.1:${this.bridgePort}/api/status`,
      { timeout: 2000 },
      res => {
        if (res.statusCode !== 200) {
          this.setInactive();
          res.resume();
          return;
        }

        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });

        res.on('end', () => {
          try {
            const data = JSON.parse(body);
            const wasActive = this.engineInfo.active;

            this.engineInfo = {
              active: data.status === 'running',
              version: data.version,
              mode: data.mode,
              socksPort: data.socksPort,
              httpPort: data.httpPort,
              bondedAdaptersCount: data.bondedAdaptersCount,
              adapters: data.adapters,
              totalThroughputBps: (data.totalRxBps || 0) + (data.totalTxBps || 0),
            };

            if (!wasActive && this.engineInfo.active) {
              this.emit('engine-connected', this.engineInfo);
            }
            this.emit('update', this.engineInfo);
          } catch {
            this.setInactive();
          }
        });
      }
    );

    req.on('error', () => {
      this.setInactive();
    });

    req.on('timeout', () => {
      req.destroy();
      this.setInactive();
    });
  }

  private setInactive(): void {
    if (this.engineInfo.active) {
      this.engineInfo = { active: false };
      this.emit('engine-disconnected');
      this.emit('update', this.engineInfo);
    }
  }
}

export const netfloBridge = new NetFloBridge();
