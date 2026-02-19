"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Activity,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Filter,
  Plus,
} from "lucide-react";
import DeploymentModal, { Deployment as ModalDeployment } from "@/components/DeploymentModal";

type DeploymentStatus = "Deployed" | "In Progress" | "Failed";

interface Deployment {
  id: string;
  name: string;
  environment: string;
  status: DeploymentStatus;
  progress: number;
  dueDate: string;
  pipeline: string;
  tags: string[];
}

const initialDeployments: Deployment[] = [
  {
    id: "1",
    name: "Azure OpenAI Integration",
    environment: "Production",
    status: "Deployed",
    progress: 100,
    dueDate: "Feb 28, 2026",
    pipeline: "GitHub-Actions",
    tags: ["Azure-East-US", "Production", "Completed"],
  },
  {
    id: "2",
    name: "Cognitive Services Deployment",
    environment: "Staging",
    status: "In Progress",
    progress: 72,
    dueDate: "Mar 5, 2026",
    pipeline: "Azure-DevOps",
    tags: ["Azure-West-EU", "Staging", "Build"],
  },
  {
    id: "3",
    name: "ML Pipeline Optimization",
    environment: "Production",
    status: "Deployed",
    progress: 100,
    dueDate: "Feb 22, 2026",
    pipeline: "GitHub-Actions",
    tags: ["Azure-South-Central", "Production", "Completed"],
  },
  {
    id: "4",
    name: "AI Hub Infrastructure",
    environment: "Production",
    status: "Deployed",
    progress: 100,
    dueDate: "Mar 12, 2026",
    pipeline: "Terraform",
    tags: ["Azure-East-US", "Production", "IaC"],
  },
  {
    id: "5",
    name: "Data Processing Cluster",
    environment: "Staging",
    status: "Failed",
    progress: 45,
    dueDate: "Mar 18, 2026",
    pipeline: "Kubernetes",
    tags: ["Azure-UK-South", "Staging", "Error"],
  },
  {
    id: "6",
    name: "Security Hardening",
    environment: "Production",
    status: "Deployed",
    progress: 100,
    dueDate: "Feb 10, 2026",
    pipeline: "GitHub-Actions",
    tags: ["All-Regions", "Production", "Completed"],
  },
  {
    id: "7",
    name: "API Gateway Update",
    environment: "Production",
    status: "Deployed",
    progress: 100,
    dueDate: "Mar 25, 2026",
    pipeline: "Azure-DevOps",
    tags: ["Azure-East-US", "Production", "Completed"],
  },
  {
    id: "8",
    name: "Monitoring Stack Upgrade",
    environment: "Staging",
    status: "In Progress",
    progress: 68,
    dueDate: "Apr 1, 2026",
    pipeline: "Helm",
    tags: ["Azure-West-US", "Staging", "Deploy"],
  },
];

const statusConfig = {
  Deployed: {
    bg: "var(--accent-subtle)",
    color: "var(--accent)",
    border: "var(--accent-muted)",
    icon: CheckCircle2,
    dot: "var(--accent)",
  },
  "In Progress": {
    bg: "rgba(161, 161, 161, 0.1)",
    color: "#a1a1a1",
    border: "rgba(161, 161, 161, 0.2)",
    icon: Clock,
    dot: "#a1a1a1",
  },
  Failed: {
    bg: "rgba(244, 63, 94, 0.1)",
    color: "#f43f5e",
    border: "rgba(244, 63, 94, 0.2)",
    icon: AlertTriangle,
    dot: "#f43f5e",
  },
};

const stats = [
  { label: "Total Deployments", value: "8", icon: Activity },
  { label: "Deployed", value: "5", icon: CheckCircle2 },
  { label: "In Progress", value: "2", icon: Clock },
  { label: "Failed", value: "1", icon: AlertTriangle },
];

export default function OperationsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>(initialDeployments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddDeployment(newDep: ModalDeployment) {
    const statusMap: { [key: string]: DeploymentStatus } = {
      inProgress: "In Progress",
      deployed: "Deployed",
      failed: "Failed",
    };
    
    setDeployments([
      ...deployments,
      {
        id: String(deployments.length + 1),
        name: newDep.name,
        environment: "Staging",
        status: statusMap[newDep.status] || "Deployed",
        progress: newDep.status === "deployed" ? 100 : newDep.status === "failed" ? 0 : 10,
        dueDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        pipeline: "GitHub-Actions",
        tags: ["New", newDep.status],
      },
    ]);
  }

  return (
    <div className="min-h-screen p-8 md:p-10" data-operations>
      <DeploymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddDeployment} />
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <div className="flex-1">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Deployment Pipeline
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Manage and monitor cloud infrastructure deployment operations
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
                e.currentTarget.style.borderColor =
                  "var(--border-color-strong)";
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
                    {stat.label}
                  </p>
                  <p
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
                  style={{ backgroundColor: "var(--accent-subtle)" }}
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--accent)" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deployments Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        {/* Section Header */}
        <div className="mb-7 flex items-center justify-between">
          <h2
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            All Deployments
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  "var(--border-color-strong)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <Filter className="h-3.5 w-3.5" strokeWidth={2} />
              Filter
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--background)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent)";
              }}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              New Deployment
            </button>
          </div>
        </div>

        {/* Grid — 3 columns on large, 2 on medium, 1 on small */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {deployments.map((deployment, index) => {
            const cfg = statusConfig[deployment.status];
            const StatusIcon = cfg.icon;

            return (
              <motion.article
                key={deployment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--border-color)",
                  boxShadow: "var(--card-shadow)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--card-bg-hover)";
                  e.currentTarget.style.borderColor =
                    "var(--border-color-strong)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--card-bg)";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--card-shadow)";
                }}
              >
                {/* Top row: Title + Status Badge */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-base font-bold tracking-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {deployment.name}
                    </h3>
                    <p
                      className="mt-1 truncate text-sm font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {deployment.environment}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{
                      backgroundColor: cfg.bg,
                      color: cfg.color,
                      borderColor: cfg.border,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: cfg.dot }}
                    />
                    {deployment.status}
                  </span>
                </div>

                {/* Pipeline Tag + Deployment Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--background-elevated)",
                      color: "var(--text-tertiary)",
                      border: "1px solid var(--border-color-subtle)",
                    }}
                  >
                    {deployment.pipeline}
                  </span>
                  {deployment.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: "var(--accent-subtle)",
                        color: "var(--text-tertiary)",
                        border: "1px solid var(--border-color-subtle)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="space-y-2.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span style={{ color: "var(--text-tertiary)" }}>
                      Progress
                    </span>
                    <span
                      className="font-semibold tabular-nums"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {deployment.progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--border-color-subtle)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${deployment.progress}%` }}
                      transition={{
                        duration: 0.9,
                        delay: 0.3 + index * 0.05,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cfg.dot }}
                    />
                  </div>
                </div>

                {/* Footer: Due Date + Pipeline Icon */}
                <div className="mt-5 flex items-center justify-between">
                  <p
                    className="flex items-center gap-1.5 text-xs font-medium"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
                    Due {deployment.dueDate}
                  </p>
                  <StatusIcon
                    className="h-4 w-4"
                    strokeWidth={2}
                    style={{ color: cfg.dot }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
