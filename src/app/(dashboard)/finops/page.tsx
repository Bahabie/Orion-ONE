"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingDown,
  DollarSign,
  AlertCircle,
  RefreshCw,
  Zap,
} from "lucide-react";
import { AiInsights } from "@/components/AiInsights";

interface ResourceMetric {
  id: string;
  resource: string;
  category: string;
  dailyBurn: number;
  monthlyEstimate: number;
  unitCost: number;
  efficiency: number;
}

const RESOURCES: ResourceMetric[] = [
  {
    id: "1",
    resource: "Azure OpenAI API",
    category: "AI Services",
    dailyBurn: 245.5,
    monthlyEstimate: 7365,
    unitCost: 0.0015,
    efficiency: 94,
  },
  {
    id: "2",
    resource: "Compute Instance - M2 Pro",
    category: "Compute",
    dailyBurn: 189.2,
    monthlyEstimate: 5676,
    unitCost: 0.25,
    efficiency: 87,
  },
  {
    id: "3",
    resource: "Storage Cluster",
    category: "Storage",
    dailyBurn: 132.8,
    monthlyEstimate: 3984,
    unitCost: 0.02,
    efficiency: 91,
  },
  {
    id: "4",
    resource: "Cognitive Services",
    category: "AI Services",
    dailyBurn: 98.4,
    monthlyEstimate: 2952,
    unitCost: 0.001,
    efficiency: 89,
  },
  {
    id: "5",
    resource: "Data Processing Pipeline",
    category: "Compute",
    dailyBurn: 156.7,
    monthlyEstimate: 4701,
    unitCost: 0.15,
    efficiency: 85,
  },
  {
    id: "6",
    resource: "Networking & Bandwidth",
    category: "Networking",
    dailyBurn: 67.3,
    monthlyEstimate: 2019,
    unitCost: 0.08,
    efficiency: 92,
  },
];

const TOTAL_DAILY_BURN = RESOURCES.reduce((sum, r) => sum + r.dailyBurn, 0);
const TOTAL_MONTHLY_ESTIMATE = RESOURCES.reduce((sum, r) => sum + r.monthlyEstimate, 0);
const MONTHLY_BUDGET = 25000;

// Cloud Efficiency = (Total Budget / Resource Utilized) × 100
const CLOUD_EFFICIENCY = (MONTHLY_BUDGET / TOTAL_MONTHLY_ESTIMATE) * 100;

const costByCategory = {
  "AI Services": RESOURCES.filter((r) => r.category === "AI Services").reduce(
    (sum, r) => sum + r.monthlyEstimate,
    0
  ),
  Compute: RESOURCES.filter((r) => r.category === "Compute").reduce(
    (sum, r) => sum + r.monthlyEstimate,
    0
  ),
  Storage: RESOURCES.filter((r) => r.category === "Storage").reduce(
    (sum, r) => sum + r.monthlyEstimate,
    0
  ),
  Networking: RESOURCES.filter((r) => r.category === "Networking").reduce(
    (sum, r) => sum + r.monthlyEstimate,
    0
  ),
};

export default function FinOpsPage() {
  return (
    <div className="min-h-screen p-8 md:p-10" data-finops>
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Financial Operations
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Financial Operations
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Monthly Budget */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
          className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
            e.currentTarget.style.borderColor = "var(--border-color-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Monthly Budget
              </p>
              <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                ${MONTHLY_BUDGET.toLocaleString()}
              </p>
            </div>
            <div
              className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: "var(--accent-subtle)" }}
            >
              <DollarSign
                className="h-5 w-5 shrink-0"
                strokeWidth={1.5}
                style={{ color: "var(--accent)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Total Monthly Burn */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.4, 0, 0.2, 1] }}
          className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
            e.currentTarget.style.borderColor = "var(--border-color-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Monthly Burn
              </p>
              <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                ${TOTAL_MONTHLY_ESTIMATE.toLocaleString()}
              </p>
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                {((TOTAL_MONTHLY_ESTIMATE / MONTHLY_BUDGET) * 100).toFixed(1)}% of budget
              </p>
            </div>
            <div
              className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: "var(--accent-subtle)" }}
            >
              <TrendingDown
                className="h-5 w-5 shrink-0"
                strokeWidth={1.5}
                style={{ color: "var(--accent)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Daily Burn Rate */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
            e.currentTarget.style.borderColor = "var(--border-color-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Daily Burn Rate
              </p>
              <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                ${TOTAL_DAILY_BURN.toFixed(0)}
              </p>
            </div>
            <div
              className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: "var(--accent-subtle)" }}
            >
              <Zap
                className="h-5 w-5 shrink-0"
                strokeWidth={1.5}
                style={{ color: "var(--accent)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Cloud Efficiency Score */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: [0.4, 0, 0.2, 1] }}
          className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
            e.currentTarget.style.borderColor = "var(--border-color-strong)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--card-bg)";
            e.currentTarget.style.borderColor = "var(--border-color)";
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Cloud Efficiency
              </p>
              <p
                className="text-3xl font-bold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {CLOUD_EFFICIENCY.toFixed(1)}%
              </p>
              <p
                className="mt-2 text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                Budget / Usage
              </p>
            </div>
            <div
              className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
              style={{ backgroundColor: "var(--accent-subtle)" }}
            >
              <BarChart3
                className="h-5 w-5 shrink-0"
                strokeWidth={1.5}
                style={{ color: "var(--accent)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Insights Widget */}
      <AiInsights />

      {/* Resources Table */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-10 rounded-xl border overflow-hidden transition-all duration-200"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
          boxShadow: "var(--card-shadow)",
        }}
      >
        {/* Table Header */}
        <div
          className="border-b px-7 py-5 transition-colors duration-200"
          style={{ borderColor: "var(--border-color)" }}
        >
          <h2
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Resource Metrics
          </h2>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                style={{ borderColor: "var(--border-color)" }}
                className="border-b"
              >
                <th
                  className="px-7 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Resource
                </th>
                <th
                  className="px-7 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Daily Burn
                </th>
                <th
                  className="px-7 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Monthly Estimate
                </th>
                <th
                  className="px-7 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Unit Cost
                </th>
                <th
                  className="px-7 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Efficiency
                </th>
              </tr>
            </thead>
            <tbody>
              {RESOURCES.map((resource, index) => (
                <motion.tr
                  key={resource.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3 + index * 0.05,
                  }}
                  style={{ borderColor: "var(--border-color)" }}
                  className="border-b transition-all duration-200 hover:bg-[var(--card-bg-hover)]"
                >
                  <td
                    className="px-7 py-4 text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <div>
                      <p className="font-semibold">{resource.resource}</p>
                      <p
                        className="mt-1 text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {resource.category}
                      </p>
                    </div>
                  </td>
                  <td
                    className="px-7 py-4 text-right text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${resource.dailyBurn.toFixed(2)}
                  </td>
                  <td
                    className="px-7 py-4 text-right text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${resource.monthlyEstimate.toLocaleString()}
                  </td>
                  <td
                    className="px-7 py-4 text-right text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ${resource.unitCost.toFixed(4)}
                  </td>
                  <td className="px-7 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div
                        className="h-1.5 w-32 overflow-hidden rounded-full"
                        style={{ backgroundColor: "var(--border-color-subtle)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: "var(--accent)",
                            width: `${resource.efficiency}%`,
                          }}
                        />
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {resource.efficiency}%
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Cost Allocation Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid gap-5 sm:grid-cols-2"
      >
        <div
          className="rounded-xl border px-6 py-5 transition-all duration-200"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h3
            className="mb-6 text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Cost Allocation
          </h3>
          <div className="space-y-3">
            {Object.entries(costByCategory).map(([category, cost]) => (
              <div key={category} className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {category === "AI Services"
                    ? "Yapay Zeka Hizmetleri"
                    : category === "Compute"
                    ? "Hesaplama"
                    : category === "Storage"
                    ? "Depolama"
                    : "Ağ"}
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-16 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--border-color-subtle)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: "var(--accent)",
                        width: `${(cost / TOTAL_MONTHLY_ESTIMATE) * 100}%`,
                      }}
                    />
                  </div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${cost.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="rounded-xl border px-6 py-5 transition-all duration-200"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h3
            className="mb-6 text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Cloud Credits & Incentives
          </h3>
          <div className="space-y-4">
            <div>
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Azure Credits Available
              </p>
              <p
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--accent)" }}
              >
                $5,840
              </p>
            </div>
            <div
              className="border-t pt-4 transition-colors duration-200"
              style={{ borderColor: "var(--border-color)" }}
            >
              <p
                className="text-xs uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Potential Savings (Next Month)
              </p>
              <p
                className="mt-2 text-2xl font-bold"
                style={{ color: "var(--status-success)" }}
              >
                $2,450
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
