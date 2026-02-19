'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: string;
  action: string;
  status: 'success' | 'failure' | 'pending';
  details: string;
}

export default function AIAgentLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 5000),
      agent: 'CostOptimizer',
      action: 'Analyzed compute resources',
      status: 'success',
      details: 'Found 3 underutilized instances. Recommended rightsizing.',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15000),
      agent: 'SecurityAuditor',
      action: 'Scanned for vulnerabilities',
      status: 'success',
      details: 'All systems passed security compliance checks.',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30000),
      agent: 'PerformanceMonitor',
      action: 'Detected anomaly',
      status: 'pending',
      details: 'Elevated CPU usage detected. Investigating root cause...',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const agents = ['CostOptimizer', 'SecurityAuditor', 'PerformanceMonitor', 'BackupManager'];
      const actions = ['Analyzed resources', 'Scanned system', 'Executed task', 'Generated report'];

      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        agent: agents[Math.floor(Math.random() * agents.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        status: ['success', 'pending'][Math.floor(Math.random() * 2)] as any,
        details: 'Task processed successfully',
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
    }, 4000);

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
          AI Agent Logs
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Monitor autonomous AI agent activities and task execution history
        </p>
      </div>

      {/* Logs */}
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-lg border hover:shadow-2 transition-all"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-start gap-3 mb-2">
              {log.status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p
                    className="font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {log.agent}
                  </p>
                  <span
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{
                      backgroundColor:
                        log.status === 'success'
                          ? 'var(--status-success-bg)'
                          : 'var(--status-warning-bg)',
                      color:
                        log.status === 'success'
                          ? 'var(--status-success)'
                          : 'var(--status-warning)',
                    }}
                  >
                    {log.status}
                  </span>
                </div>
                <p
                  className="text-sm mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {log.action}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {log.details}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {log.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
