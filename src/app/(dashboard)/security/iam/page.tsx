'use client';

import React, { useState, useTransition } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: Date;
  mfaEnabled: boolean;
}

function roleChangeAction(userId: string, newRole: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`User ${userId} role updated to ${newRole}`);
      resolve();
    }, 600);
  });
}

function statusToggleAction(userId: string, newStatus: string): Promise<void> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`User ${userId} status updated to ${newStatus}`);
      resolve();
    }, 600);
  });
}

export default function IdentityAccessControl() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'admin@orion.one',
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      lastLogin: new Date(Date.now() - 5 * 60000),
      mfaEnabled: true,
    },
    {
      id: '2',
      email: 'editor@orion.one',
      name: 'Editor User',
      role: 'editor',
      status: 'active',
      lastLogin: new Date(Date.now() - 30 * 60000),
      mfaEnabled: true,
    },
    {
      id: '3',
      email: 'viewer@orion.one',
      name: 'Viewer User',
      role: 'viewer',
      status: 'active',
      lastLogin: new Date(Date.now() - 2 * 60 * 60000),
      mfaEnabled: false,
    },
    {
      id: '4',
      email: 'inactive@orion.one',
      name: 'Inactive User',
      role: 'viewer',
      status: 'inactive',
      lastLogin: new Date(Date.now() - 30 * 24 * 60 * 60000),
      mfaEnabled: false,
    },
    {
      id: '5',
      email: 'developer@orion.one',
      name: 'Developer',
      role: 'editor',
      status: 'active',
      lastLogin: new Date(Date.now() - 15 * 60000),
      mfaEnabled: true,
    },
  ]);

  const [isPending, startTransition] = useTransition();
  const [pendingUpdates, setPendingUpdates] = useState<Set<string>>(new Set());

  const handleRoleChange = (userId: string, newRole: string) => {
    // Optimistic update
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, role: newRole as any } : user))
    );

    setPendingUpdates((prev) => new Set([...prev, userId]));

    startTransition(async () => {
      try {
        await roleChangeAction(userId, newRole);
      } catch (error) {
        // Revert on error
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role: 'viewer' } : user
          )
        );
      } finally {
        setPendingUpdates((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      }
    });
  };

  const handleStatusToggle = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    // Optimistic update
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus as any } : u))
    );

    setPendingUpdates((prev) => new Set([...prev, userId]));

    startTransition(async () => {
      try {
        await statusToggleAction(userId, newStatus);
      } catch (error) {
        // Revert on error
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, status: user.status } : u))
        );
      } finally {
        setPendingUpdates((prev) => {
          const next = new Set(prev);
          next.delete(userId);
          return next;
        });
      }
    });
  };

  const roleDistribution = {
    admin: users.filter((u) => u.role === 'admin').length,
    editor: users.filter((u) => u.role === 'editor').length,
    viewer: users.filter((u) => u.role === 'viewer').length,
  };

  const mfaEnabledCount = users.filter((u) => u.mfaEnabled).length;

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Identity Access (IAM)
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Manage user roles, permissions, and multi-factor authentication
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: users.length },
          { label: 'Administrators', value: roleDistribution.admin },
          { label: 'MFA Enabled', value: mfaEnabledCount },
          { label: 'Active', value: users.filter((u) => u.status === 'active').length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <p
              className="text-xs font-medium mb-1"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {stat.label}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  backgroundColor: 'var(--background-elevated)',
                  borderBottomColor: 'var(--border-color)',
                }}
                className="border-b"
              >
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  User
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Role
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
                  MFA
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Last Login
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottomColor: 'var(--border-color)',
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--background)',
                  }}
                  className="border-b hover:bg-accent-subtle transition-colors"
                >
                  {/* User Info */}
                  <td className="px-6 py-4">
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {user.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {user.email}
                      </p>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={pendingUpdates.has(user.id) || isPending}
                      className="px-2 py-1 rounded text-xs font-medium border transition-colors opacity-100 disabled:opacity-60"
                      style={{
                        backgroundColor: 'var(--background)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleStatusToggle(user.id)}
                      disabled={pendingUpdates.has(user.id) || isPending}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors disabled:opacity-60 border ${
                        user.status === 'active'
                          ? 'bg-zinc-800 text-emerald-400 border-emerald-400/20'
                          : 'bg-zinc-800 text-amber-400 border-amber-400/20'
                      }`}
                    >
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </button>
                  </td>

                  {/* MFA */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.mfaEnabled ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-600" />
                      )}
                      <span
                        className="text-xs"
                        style={{ color: user.mfaEnabled ? 'var(--status-success)' : 'var(--text-tertiary)' }}
                      >
                        {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </td>

                  {/* Last Login */}
                  <td className="px-6 py-4">
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {user.lastLogin.toLocaleString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Recommendations */}
      <div
        className="p-4 rounded-lg border flex gap-3"
        style={{
          backgroundColor: 'var(--status-info-bg)',
          borderColor: 'var(--status-info)',
        }}
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--status-info)' }} />
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p className="font-medium mb-1">Güvenlik Önerisi</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Tüm yönetici hesapları için MFA etkinleştirin (şu anda: {users.filter((u) => u.role === 'admin' && !u.mfaEnabled).length} eksik)</li>
            <li>Pasif kullanıcıları üç ayda bir gözden geçirin ve kullanılmayan hesapları devre dışı bırakın</li>
            <li>Her 90 günde bir şifre değiştirme politikası uygulayın</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
