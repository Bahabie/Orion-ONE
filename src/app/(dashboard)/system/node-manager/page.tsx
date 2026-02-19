'use client';

import React, { useState, useEffect } from 'react';

interface Node {
  id: string;
  hostname: string;
  ip: string;
  status: 'active' | 'degraded' | 'offline';
  cpu: number;
  memory: number;
  disk: number;
}

export default function NodeManager() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      hostname: 'node-us-east-1a',
      ip: '10.0.1.5',
      status: 'active',
      cpu: 42,
      memory: 68,
      disk: 45,
    },
    {
      id: '2',
      hostname: 'node-us-east-1b',
      ip: '10.0.1.6',
      status: 'active',
      cpu: 35,
      memory: 52,
      disk: 38,
    },
    {
      id: '3',
      hostname: 'node-eu-west-1a',
      ip: '10.1.1.8',
      status: 'degraded',
      cpu: 78,
      memory: 85,
      disk: 72,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          cpu: Math.max(5, Math.min(95, node.cpu + (Math.random() - 0.5) * 20)),
          memory: Math.max(5, Math.min(95, node.memory + (Math.random() - 0.5) * 15)),
          disk: Math.max(5, Math.min(95, node.disk + (Math.random() - 0.5) * 10)),
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Node Manager
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Manage and monitor individual node resources and health
        </p>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            {/* Node Info */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-1">
                <h3
                  className="font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {node.hostname}
                </h3>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                    node.status === 'active'
                      ? 'bg-zinc-800 text-emerald-400 border border-emerald-400/20'
                      : node.status === 'degraded'
                      ? 'bg-zinc-800 text-amber-400 border border-amber-400/20'
                      : 'bg-zinc-800 text-red-400 border border-red-400/20'
                  }`}
                >
                  {node.status === 'active'
                    ? 'Active'
                    : node.status === 'degraded'
                    ? 'Degraded'
                    : 'Offline'}
                </span>
              </div>
              <p
                className="text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {node.ip}
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-4">
              {[
                { label: 'CPU', value: node.cpu },
                { label: 'Memory', value: node.memory },
                { label: 'Disk', value: node.disk },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between mb-2">
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
                      {metric.value.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-400 to-zinc-300"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
