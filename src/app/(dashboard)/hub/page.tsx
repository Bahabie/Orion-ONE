'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useModule } from '@/contexts/ModuleContext';
import { AlertCircle, TrendingUp, Zap, Shield } from 'lucide-react';

// Dynamically load chart component (react-apexcharts is a React component)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Streaming data simulation
interface IntelligenceItem {
  id: string;
  title: string;
  description: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  actionable: boolean;
}

interface ResourceNode {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  latency: number;
}

function StreamingDataSimulation() {
  const [insights, setInsights] = useState<IntelligenceItem[]>(() => [
    {
      id: '1',
      title: 'Anomalous CPU Spike Detected',
      description: 'Azure VM cluster-west shows 87% CPU utilization. Recommend scaling horizontally.',
      confidence: 94,
      priority: 'high',
      timestamp: new Date(Date.now() - 5 * 60000),
      actionable: true,
    },
    {
      id: '2',
      title: 'Cost Optimization Opportunity',
      description: 'Reserved instances can save 42% on compute costs over 3 years.',
      confidence: 87,
      priority: 'medium',
      timestamp: new Date(Date.now() - 15 * 60000),
      actionable: true,
    },
    {
      id: '3',
      title: 'Security Posture Improved',
      description: 'All compliance checks passed. Zero findings in last scan.',
      confidence: 100,
      priority: 'low',
      timestamp: new Date(Date.now() - 30 * 60000),
      actionable: false,
    },
  ]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Projected Performance',
        data: [40, 45, 50, 48, 55, 62, 70, 75, 68, 72, 78, 85],
      },
      {
        name: 'Actual Performance',
        data: [35, 42, 48, 46, 52, 58, 65, 72, 70, 74, 76, 82],
      },
    ],
  });

  const [resourceNodes, setResourceNodes] = useState<ResourceNode[]>(() => [
    { id: '1', name: 'Azure East US', status: 'healthy', latency: 12 },
    { id: '2', name: 'Azure West EU', status: 'healthy', latency: 28 },
    { id: '3', name: 'Azure Southeast', status: 'warning', latency: 45 },
    { id: '4', name: 'Local Cache', status: 'healthy', latency: 3 },
  ]);

  const [isPending, startTransition] = useTransition();

  // Simulate streaming data
  useEffect(() => {
    const interval = setInterval(() => {
      startTransition(() => {
        setResourceNodes((prev) =>
          prev.map((node) => ({
            ...node,
            latency: Math.max(2, node.latency + (Math.random() - 0.5) * 10),
          }))
        );

        // Occasionally add new insights
        if (Math.random() > 0.7) {
          const newInsight: IntelligenceItem = {
            id: Date.now().toString(),
            title: 'New Intelligence Update',
            description: `System event recorded at ${new Date().toLocaleTimeString()}`,
            confidence: Math.floor(Math.random() * 30 + 70),
            priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as any,
            timestamp: new Date(),
            actionable: Math.random() > 0.5,
          };
          setInsights((prev) => [newInsight, ...prev.slice(0, 9)]);
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [startTransition]);

  return {
    insights,
    chartData,
    resourceNodes,
    isPending,
  };
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  return (
    <div className="relative w-full h-1.5 bg-zinc-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-zinc-400 to-zinc-300 transition-all duration-300"
        style={{ width: `${confidence}%` }}
      />
    </div>
  );
}

function StatusOrb({ status }: { status: 'healthy' | 'warning' | 'critical' }) {
  const statusColor = {
    healthy: 'var(--status-success)',
    warning: 'var(--status-warning)',
    critical: '#ef4444',
  };

  return (
    <div className="relative inline-flex items-center justify-center w-3 h-3">
      <div
        className="absolute inset-0 rounded-full opacity-30 animate-pulse"
        style={{
          backgroundColor: statusColor[status],
          boxShadow: `0 0 12px ${statusColor[status]}`,
        }}
      />
      <div
        className="relative w-2 h-2 rounded-full"
        style={{ backgroundColor: statusColor[status] }}
      />
    </div>
  );
}

function AIInsightsFeed({ insights }: { insights: IntelligenceItem[] }) {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className="p-4 rounded-lg border transition-all duration-200 hover:shadow-2"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
          }}
          role="article"
          aria-label={`${insight.title} - Confidence: ${insight.confidence}%`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {insight.title}
              </h3>
              <p
                className="text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {insight.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <div
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor:
                  insight.priority === 'high'
                    ? 'var(--status-warning-bg)'
                    : 'var(--status-info-bg)',
                color:
                  insight.priority === 'high'
                    ? 'var(--status-warning)'
                    : 'var(--text-secondary)',
              }}
            >
              {insight.priority}
            </div>
          </div>

          {/* Description */}
          <p
            className="text-xs mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {insight.description}
          </p>

          {/* Confidence Score */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <label
                className="text-xs font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Confidence
              </label>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-secondary)' }}
              >
                {insight.confidence}%
              </span>
            </div>
            <ConfidenceBar confidence={insight.confidence} />
          </div>

          {/* Action Button */}
          {insight.actionable && (
            <button
              className="w-full py-2 px-3 rounded text-xs font-medium transition-colors duration-200"
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
              Execute Action
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ResourceMesh({ nodes }: { nodes: ResourceNode[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="p-3 rounded-lg border text-center"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex justify-center mb-2">
            <StatusOrb status={node.status} />
          </div>
          <p
            className="text-xs font-medium mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {node.name}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {node.latency.toFixed(0)}ms
          </p>
        </div>
      ))}
    </div>
  );
}

function PredictiveAnalyticsChart() {
  const chartOptions: any = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      background: 'transparent',
      sparkline: { enabled: false },
    },
    colors: ['#a1a1a1', '#71717a'],
    stroke: {
      curve: 'smooth',
      width: 2,
      dashArray: [0, 5],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
      labels: {
        style: {
          colors: 'var(--text-tertiary)',
          fontSize: '12px',
        },
      },
      axisBorder: { color: 'var(--border-color)' },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--text-tertiary)',
          fontSize: '12px',
        },
      },
    },
    grid: {
      borderColor: 'var(--border-color)',
    },
    legend: {
      labels: {
        colors: 'var(--text-secondary)',
      },
    },
  };

  return (
    <Chart
      type="area"
      series={[
        {
          name: 'Projected',
          data: [40, 45, 50, 48, 55, 62, 70, 75, 68, 72, 78, 85],
        },
        {
          name: 'Actual',
          data: [35, 42, 48, 46, 52, 58, 65, 72, 70, 74, 76, 82],
        },
      ]}
      options={chartOptions}
      height={250}
    />
  );
}

export default function OrionIntelligenceHub() {
  const { insights, resourceNodes, isPending } = StreamingDataSimulation();
  const { activeTasks } = useModule();

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Orion Intelligence Hub
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Real-time monitoring and AI-driven insights for your infrastructure
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'System Health', value: '98.7%', icon: Shield },
          { label: 'Active Tasks', value: activeTasks.length.toString(), icon: Zap },
          { label: 'Insights', value: insights.length.toString(), icon: TrendingUp },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  {kpi.label}
                </span>
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {kpi.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights Feed */}
        <div className="lg:col-span-2">
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              AI Insights Feed
            </h2>
            {isPending && (
              <div className="mb-4 p-3 rounded bg-blue-500 bg-opacity-10">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Streaming live data updates...
                </p>
              </div>
            )}
            <Suspense fallback={<div>Loading insights...</div>}>
              <AIInsightsFeed insights={insights} />
            </Suspense>
          </div>
        </div>

        {/* Resource Mesh */}
        <div>
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Resource Mesh
            </h2>
            <ResourceMesh nodes={resourceNodes} />
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Predictive Analytics
        </h2>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading chart...</div>}>
          <PredictiveAnalyticsChart />
        </Suspense>
      </div>
    </div>
  );
}
