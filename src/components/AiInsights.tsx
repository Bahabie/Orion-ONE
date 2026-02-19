import { motion } from "framer-motion";
import { Zap, TrendingDown, AlertCircle } from "lucide-react";

export function AiInsights() {
  const insights = [
    {
      icon: TrendingDown,
      title: "Cost Optimization Opportunity",
      description:
        "Optimization suggested: $2.4K potential savings in Azure credits by rightsizing compute instances. Consider scaling down unused M2 Pro instances.",
      color: "var(--accent)",
      bgColor: "var(--accent-subtle)",
    },
    {
      icon: Zap,
      title: "API Efficiency Alert",
      description:
        "Azure OpenAI API usage at 94% efficiency. Current burn rate is optimal. Maintain current throttling policies.",
      color: "var(--text-secondary)",
      bgColor: "rgba(161, 161, 161, 0.1)",
    },
    {
      icon: AlertCircle,
      title: "Resource Utilization Warning",
      description:
        "Data Processing Cluster efficiency is 85%. Recommend archiving completed jobs to reduce daily burn by $45-60.",
      color: "#f43f5e",
      bgColor: "rgba(244, 63, 94, 0.1)",
    },
  ];

  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {insights.map((insight, index) => {
        const Icon = insight.icon;
        return (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.08,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="group rounded-xl border px-5 py-5 transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border-color)",
              boxShadow: "var(--card-shadow)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
              e.currentTarget.style.borderColor = "var(--border-color-strong)";
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
            {/* Icon */}
            <div
              className="mb-3 inline-flex rounded-lg p-2.5 transition-all duration-200"
              style={{ backgroundColor: insight.bgColor }}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                strokeWidth={2}
                style={{ color: insight.color }}
              />
            </div>

            {/* Title */}
            <h3
              className="mb-2 text-sm font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {insight.title}
            </h3>

            {/* Description */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {insight.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
