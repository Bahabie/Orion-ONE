'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Suspense } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface FinancialMetric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

export default function FinancialAnalytics() {
  const metrics: FinancialMetric[] = [
    {
      label: 'Total Revenue',
      value: 2840000,
      change: 12.5,
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      label: 'Monthly Spending',
      value: 127450,
      change: -3.2,
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      label: 'Projected Savings',
      value: 89320,
      change: 8.7,
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const chartOptions: any = {
    chart: {
      type: 'area' as const,
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ['#71717a'],
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: 'var(--text-tertiary)',
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--text-tertiary)',
          fontSize: '12px',
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Financial Analytics
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Cloud infrastructure cost analysis and financial planning
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-medium"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {metric.label}
              </span>
              <div style={{ color: 'var(--text-secondary)' }}>
                {metric.icon}
              </div>
            </div>
            <p
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text-primary)' }}
            >
              ${metric.value.toLocaleString()}
            </p>
            <p
              className={`text-xs font-medium ${
                metric.change > 0 ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {metric.change > 0 ? '+' : ''}{metric.change}% vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Trend */}
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
          6-Month Financial Trend
        </h2>
        <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading chart...</div>}>
          <Chart
            type="area"
            series={[{ name: 'Revenue', data: [240, 280, 320, 350, 320, 380] }]}
            options={chartOptions}
            height={250}
          />
        </Suspense>
      </div>

      {/* Breakdown Table */}
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
                  Category
                </th>
                <th
                  className="px-6 py-3 text-right font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Cost
                </th>
                <th
                  className="px-6 py-3 text-right font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  % of Total
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { category: 'Compute', cost: 45000, total: 100000 },
                { category: 'Storage', cost: 23000, total: 100000 },
                { category: 'Network', cost: 18000, total: 100000 },
                { category: 'Database', cost: 14000, total: 100000 },
              ].map((row) => (
                <tr key={row.category} className="border-b hover:bg-accent-subtle" style={{ borderColor: 'var(--border-color)' }}>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {row.category}
                  </td>
                  <td
                    className="px-6 py-4 text-right"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    ${row.cost.toLocaleString()}
                  </td>
                  <td
                    className="px-6 py-4 text-right"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {((row.cost / row.total) * 100).toFixed(1)}%
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
