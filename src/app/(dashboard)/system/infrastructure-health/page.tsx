'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface Endpoint {
  id: string;
  name: string;
  region: string;
  latency: number;
  uptime: number;
  requestsPerSecond: number;
  lastUpdate: Date;
}

function StatusOrb({ status }: { status: 'healthy' | 'warning' | 'critical' }) {
  const statusColor = {
    healthy: 'var(--status-success)',
    warning: 'var(--status-warning)',
    critical: '#ef4444',
  };

  return (
    <div className="relative inline-flex items-center justify-center w-4 h-4">
      <div
        className="absolute inset-0 rounded-full opacity-40 animate-pulse"
        style={{
          backgroundColor: statusColor[status],
          boxShadow: `0 0 16px ${statusColor[status]}`,
        }}
      />
      <div
        className="relative w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: statusColor[status] }}
      />
    </div>
  );
}

function getStatus(latency: number, uptime: number): 'healthy' | 'warning' | 'critical' {
  if (uptime < 95 || latency > 100) return 'critical';
  if (uptime < 98 || latency > 50) return 'warning';
  return 'healthy';
}

function StreamingLogPanel({
  endpoint,
  onClose,
}: {
  endpoint: Endpoint | null;
  onClose: () => void;
}) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!endpoint) return;

    // Simulate streaming logs
    const interval = setInterval(() => {
      const logMessages = [
        'Request processed in 12ms',
        'Database query completed',
        'Cache hit ratio: 94%',
        'Memory usage: 2.4GB / 4GB',
        'CPU utilization: 45%',
        'All health checks passed',
        'Backup completed successfully',
      ];

      setLogs((prev) => {
        const newLog = `[${new Date().toLocaleTimeString()}] ${
          logMessages[Math.floor(Math.random() * logMessages.length)]
        }`;
        return [newLog, ...prev.slice(0, 49)];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [endpoint]);

  if (!endpoint) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-end md:justify-start">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full md:w-96 h-96 md:h-screen md:max-h-screen flex flex-col rounded-t-lg md:rounded-lg border"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-4)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <h2
              className="font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {endpoint.name} Logs
            </h2>
            <p
              className="text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Real-time streaming logs
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent-subtle rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Logs Container */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1">
          {logs.length === 0 ? (
            <p
              style={{ color: 'var(--text-tertiary)' }}
            >
              Waiting for logs...
            </p>
          ) : (
            logs.map((log, i) => (
              <p
                key={i}
                style={{ color: 'var(--text-secondary)' }}
              >
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function InfrastructureHealth() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      id: '1',
      name: 'API Gateway',
      region: 'East US',
      latency: 12,
      uptime: 99.97,
      requestsPerSecond: 4250,
      lastUpdate: new Date(),
    },
    {
      id: '2',
      name: 'Database Cluster',
      region: 'West EU',
      latency: 28,
      uptime: 99.95,
      requestsPerSecond: 1840,
      lastUpdate: new Date(),
    },
    {
      id: '3',
      name: 'Cache Layer',
      region: 'Southeast Asia',
      latency: 45,
      uptime: 99.88,
      requestsPerSecond: 8920,
      lastUpdate: new Date(),
    },
    {
      id: '4',
      name: 'Message Queue',
      region: 'Central US',
      latency: 8,
      uptime: 99.99,
      requestsPerSecond: 12500,
      lastUpdate: new Date(),
    },
    {
      id: '5',
      name: 'Storage Service',
      region: 'North EU',
      latency: 32,
      uptime: 99.92,
      requestsPerSecond: 2100,
      lastUpdate: new Date(),
    },
    {
      id: '6',
      name: 'Analytics Engine',
      region: 'East US',
      latency: 156,
      uptime: 97.2,
      requestsPerSecond: 542,
      lastUpdate: new Date(),
    },
  ]);

  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);

  // Simulate latency changes
  useEffect(() => {
    const interval = setInterval(() => {
      setEndpoints((prev) =>
        prev.map((endpoint) => ({
          ...endpoint,
          latency: Math.max(2, endpoint.latency + (Math.random() - 0.5) * 20),
          uptime: Math.min(100, endpoint.uptime + (Math.random() - 0.6) * 0.1),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const healthyCount = endpoints.filter(
    (e) => getStatus(e.latency, e.uptime) === 'healthy'
  ).length;
  const warningCount = endpoints.filter(
    (e) => getStatus(e.latency, e.uptime) === 'warning'
  ).length;
  const criticalCount = endpoints.filter(
    (e) => getStatus(e.latency, e.uptime) === 'critical'
  ).length;

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Infrastructure Health
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Real-time monitoring of all service endpoints and infrastructure components
        </p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Healthy', value: healthyCount, color: 'var(--status-success)' },
          { label: 'Warning', value: warningCount, color: 'var(--status-warning)' },
          { label: 'Critical', value: criticalCount, color: '#ef4444' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <p
              className="text-xs font-medium mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {stat.label}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Endpoints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {endpoints.map((endpoint) => {
          const status = getStatus(endpoint.latency, endpoint.uptime);

          return (
            <div
              key={endpoint.id}
              className="p-4 rounded-lg border hover:shadow-2 transition-all cursor-pointer"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {endpoint.name}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {endpoint.region}
                  </p>
                </div>
                <StatusOrb status={status} />
              </div>

              {/* Metrics */}
              <div className="space-y-3 mb-4">
                {[
                  {
                    label: 'Latency',
                    value: `${endpoint.latency.toFixed(0)}ms`,
                    max: 100,
                  },
                  {
                    label: 'Uptime',
                    value: `${endpoint.uptime.toFixed(2)}%`,
                    max: 100,
                  },
                  {
                    label: 'RPS',
                    value: `${endpoint.requestsPerSecond.toLocaleString()}`,
                    max: endpoint.requestsPerSecond,
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between items-center mb-1">
                      <label
                        className="text-xs font-medium"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {metric.label}
                      </label>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-zinc-400 to-zinc-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (parseFloat(metric.value) / metric.max) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedEndpoint(endpoint)}
                className="w-full py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                style={{
                  backgroundColor: 'var(--accent-muted)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-muted)';
                }}
              >
                View Logs
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Streaming Log Panel */}
      <StreamingLogPanel
        endpoint={selectedEndpoint}
        onClose={() => setSelectedEndpoint(null)}
      />
    </div>
  );
}
