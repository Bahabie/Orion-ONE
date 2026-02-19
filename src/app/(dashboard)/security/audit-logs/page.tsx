'use client';

import React, { useState, useEffect } from 'react';
import { User, Shield, Lock } from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: Date;
  actor: string;
  action: string;
  resource: string;
  status: 'success' | 'failure';
  ipAddress: string;
}

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 5000),
      actor: 'admin@orion.one',
      action: 'Created',
      resource: 'API Key #sk-12345',
      status: 'success',
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15000),
      actor: 'editor@orion.one',
      action: 'Modified',
      resource: 'User: viewer@orion.one',
      status: 'success',
      ipAddress: '192.168.1.102',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 45000),
      actor: 'unknown',
      action: 'Attempted login',
      resource: 'admin@orion.one',
      status: 'failure',
      ipAddress: '203.0.113.45',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actors = ['admin@orion.one', 'editor@orion.one', 'system', 'unknown'];
      const actions = ['Created', 'Modified', 'Deleted', 'Accessed', 'Attempted'];
      const resources = [
        'API Key',
        'User Account',
        'Secret',
        'Policy',
        'Security Group',
      ];

      const newLog: AuditLog = {
        id: Date.now().toString(),
        timestamp: new Date(),
        actor: actors[Math.floor(Math.random() * actors.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        resource: resources[Math.floor(Math.random() * resources.length)],
        status: Math.random() > 0.1 ? 'success' : 'failure',
        ipAddress: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    }, 5000);

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
          Denetim Günlükleri
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Tüm sistem eylemleri ve güvenlik olaylarının kapsamlı denetim izi
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: 'Toplam Olaylar',
            value: logs.length,
            icon: <Shield className="w-5 h-5" />,
          },
          {
            label: 'Successful',
            value: logs.filter((l) => l.status === 'success').length,
            icon: <User className="w-5 h-5" />,
          },
          {
            label: 'Failed',
            value: logs.filter((l) => l.status === 'failure').length,
            icon: <Lock className="w-5 h-5" />,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div style={{ color: 'var(--text-secondary)' }}>
                {stat.icon}
              </div>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {stat.label}
              </p>
            </div>
            <p
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              style={{
                backgroundColor: 'var(--background-elevated)',
              }}
            >
              <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Timestamp
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Actor
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Action
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Resource
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b hover:bg-accent-subtle" style={{ borderColor: 'var(--border-color)' }}>
                  <td
                    className="px-6 py-4 text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {log.actor}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {log.action}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {log.resource}
                  </td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      log.status === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {log.status}
                  </td>
                  <td
                    className="px-6 py-4 text-xs font-mono"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
