'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import {
  Gauge,
  Workflow,
  Lock,
  TrendingUp,
  BarChart3,
  Network,
  Users,
  FileText,
  Activity,
  LogOut,
  Lightbulb,
  Shield,
  Zap,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

/* AI Workspace, Command Center, Security - the three pillars */
const NAV_GROUPS: NavGroup[] = [
  {
    title: 'AI WORKSPACE',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <Gauge className="w-4 h-4" /> },
      { label: 'Intelligence Hub', href: '/hub', icon: <Lightbulb className="w-4 h-4" /> },
      { label: 'Workflow Engine', href: '/automation/workflow-engine', icon: <Workflow className="w-4 h-4" /> },
      { label: 'AI Logs', href: '/automation/ai-agent-logs', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  {
    title: 'COMMAND CENTER',
    items: [
      { label: 'Infrastructure', href: '/system/infrastructure-health', icon: <Network className="w-4 h-4" /> },
      { label: 'Node Manager', href: '/system/node-manager', icon: <Activity className="w-4 h-4" /> },
      { label: 'Operations', href: '/operations', icon: <Zap className="w-4 h-4" /> },
    ],
  },
  {
    title: 'SECURITY',
    items: [
      { label: 'Identity (IAM)', href: '/security/iam', icon: <Users className="w-4 h-4" /> },
      { label: 'Audit Trail', href: '/security/audit-logs', icon: <FileText className="w-4 h-4" /> },
      { label: 'Secrets Manager', href: '/security/secrets-manager', icon: <Lock className="w-4 h-4" /> },
    ],
  },
  {
    title: 'FINANCE',
    items: [
      { label: 'Treasury', href: '/treasury/transaction-ledger', icon: <BarChart3 className="w-4 h-4" /> },
      { label: 'FinOps', href: '/finops', icon: <TrendingUp className="w-4 h-4" /> },
      { label: 'Analytics', href: '/treasury/financial-analytics', icon: <BarChart3 className="w-4 h-4" /> },
    ],
  },
];


function SystemHealthWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="px-4 py-3 rounded-lg border"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-white tracking-wide">SYSTEM STATUS</p>
        <div className="relative w-2 h-2 flex-shrink-0">
          <div
            className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-pulse"
            style={{
              boxShadow: '0 0 12px rgba(34, 197, 94, 0.5)',
            }}
          />
          <div className="relative w-2 h-2 rounded-full bg-green-400" />
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-white mb-1">Operational</p>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Uptime: 99.9%
        </p>
      </div>
    </motion.div>
  );
}

function UserProfileFooter() {
  const [hovering, setHovering] = useState(false);

  const handleSignOut = async () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/api/auth/signout?redirect=/login';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="cursor-pointer rounded-lg p-3 transition-all duration-300"
      style={{
        backgroundColor: hovering ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <motion.div
          animate={{ y: hovering ? -2 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            backgroundColor: 'var(--background-elevated)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }}
        >
          AB
        </motion.div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate" title="Ali Baha Yorgancıoğlu">
            Ali Baha Yorgancıoğlu
          </p>
          <p className="text-xs text-zinc-500 truncate">
            admin@orion.one
          </p>
        </div>

        {/* Sign Out Button - Hidden until hover */}
        <AnimatePresence>
          {hovering && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="p-2 rounded-lg transition-colors duration-200 flex-shrink-0"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4 text-zinc-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function SidebarLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      layout
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Active Indicator Background */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId={`active-bg-${item.href}`}
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 80%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Vertical Left Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId={`active-indicator-${item.href}`}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      {/* Link Content */}
      <Link
        href={item.href}
        className="relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300"
        style={{
          backgroundColor: hovering && !isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
          color: isActive ? 'white' : 'var(--text-secondary)',
        }}
      >
        <motion.div
          animate={{
            color: isActive ? '#ffffff' : 'var(--text-secondary)',
          }}
          transition={{ duration: 0.2 }}
        >
          {item.icon}
        </motion.div>
        <span className="text-sm font-medium truncate">{item.label}</span>
      </Link>
    </motion.div>
  );
}


export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  if (!mounted) return null;

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen flex flex-col z-40 will-change-transform"
      style={{
        backgroundColor: 'var(--background-elevated)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        width: '280px',
      }}
    >
      {/* Sidebar Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center justify-between p-6 border-b"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <Link href="/dashboard">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg font-bold tracking-tight text-white cursor-pointer transition-opacity duration-300 hover:opacity-70"
          >
            ORION
          </motion.h2>
        </Link>
        <div className="text-xs text-zinc-500 font-medium">v2.0</div>
      </motion.div>

      {/* Navigation Groups with Smooth Scrolling */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-8 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
        <LayoutGroup>
          {NAV_GROUPS.map((group, groupIdx) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + groupIdx * 0.05 }}
            >
              {/* Group Label */}
              <h3
                className="text-xs font-semibold uppercase tracking-widest px-4 mb-3"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {group.title}
              </h3>

              {/* Group Items */}
              <ul className="space-y-1">
                {group.items.map((item, itemIdx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + groupIdx * 0.05 + itemIdx * 0.03 }}
                  >
                    <SidebarLink item={item} isActive={isActive(item.href)} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </LayoutGroup>
      </nav>

      {/* Footer Section - System Health + User Profile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="p-4 border-t space-y-3"
        style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <SystemHealthWidget />
        <UserProfileFooter />
      </motion.div>
    </motion.aside>
  );
}

