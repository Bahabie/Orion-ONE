"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Zap,
  ChevronRight,
} from "lucide-react";

const metricCards = [
  { label: "Active Deployments", value: "12", icon: Rocket },
  { label: "Monthly Spending", value: "$18.4K", icon: TrendingUp },
  { label: "Efficiency", value: "87%", icon: Zap },
];

const missions = [
  {
    id: "1",
    name: "Azure OpenAI Integration",
    client: "Nebula Labs",
    status: "Deployed" as const,
    progress: 100,
    dueDate: "Feb 28, 2026",
  },
  {
    id: "2",
    name: "Cognitive Services Deployment",
    client: "Phoenix Corp",
    status: "In Progress" as const,
    progress: 72,
    dueDate: "Mar 5, 2026",
  },
  {
    id: "3",
    name: "ML Pipeline Optimization",
    client: "Cosmos Inc",
    status: "Deployed" as const,
    progress: 100,
    dueDate: "Feb 22, 2026",
  },
  {
    id: "4",
    name: "AI Hub Infrastructure",
    client: "Stellar Media",
    status: "Deployed" as const,
    progress: 100,
    dueDate: "Mar 12, 2026",
  },
  {
    id: "5",
    name: "Data Processing Cluster",
    client: "Orbit Tech",
    status: "Failed" as const,
    progress: 45,
    dueDate: "Mar 18, 2026",
  },
];

export default function CommandCenterPage() {

  return (
    <div className="min-h-screen p-8 md:p-10" data-dashboard>
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Enterprise AI Platform Online
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Real-time monitoring of infrastructure, deployments, and intelligent automation systems
          </p>
        </div>
      </div>

      <div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {metricCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
            className="group rounded-xl border px-6 py-6 transition-all duration-200 cursor-pointer"
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
                  {card.label}
                </p>
                <p
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.value}
                </p>
              </div>
              <div
                className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
                style={{ backgroundColor: "var(--accent-subtle)" }}
              >
                <card.icon
                  className="h-6 w-6 shrink-0"
                  strokeWidth={1.5}
                  size={24}
                  style={{ color: "var(--accent)" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Deployments Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="mb-7 flex items-center justify-between">
          <h2
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Active Deployments
          </h2>
          <button
            type="button"
            className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            View All
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {missions.map((mission, index) => (
            <motion.article
              key={mission.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.04, ease: [0.4, 0, 0.2, 1] }}
              className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
                e.currentTarget.style.borderColor = "var(--border-color-strong)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3
                    className="truncate text-base font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {mission.name}
                  </h3>
                  <p
                    className="mt-1 truncate text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {mission.client}
                  </p>
                </div>
                <span
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{
                    backgroundColor:
                      mission.status === "Deployed"
                        ? "var(--accent-subtle)"
                        : mission.status === "In Progress"
                        ? "rgba(161, 161, 161, 0.1)"
                        : "rgba(244, 63, 94, 0.1)",
                    color:
                      mission.status === "Deployed"
                        ? "var(--accent)"
                        : mission.status === "In Progress"
                        ? "#a1a1a1"
                        : "#f43f5e",
                    borderColor:
                      mission.status === "Deployed"
                        ? "var(--accent-muted)"
                        : mission.status === "In Progress"
                        ? "rgba(161, 161, 161, 0.2)"
                        : "rgba(244, 63, 94, 0.2)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        mission.status === "Deployed"
                          ? "var(--accent)"
                          : mission.status === "In Progress"
                          ? "#a1a1a1"
                          : "#f43f5e",
                    }}
                  />
                  {mission.status}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-xs font-medium">
                  <span style={{ color: "var(--text-tertiary)" }}>
                    Progress
                  </span>
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {mission.progress}%
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--border-color-subtle)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mission.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.06, ease: [0.4, 0, 0.2, 1] }}
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      backgroundColor:
                        mission.status === "Deployed"
                          ? "var(--accent)"
                          : mission.status === "In Progress"
                          ? "#a1a1a1"
                          : "#f43f5e",
                    }}
                  />
                </div>
              </div>

              <p
                className="mt-5 flex items-center gap-1.5 text-xs font-medium"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: "var(--text-tertiary)" }} />
                Due Date {mission.dueDate}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
