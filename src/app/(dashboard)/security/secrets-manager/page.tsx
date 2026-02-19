'use client';

import React, { useState } from 'react';
import { Eye, Copy, Lock, EyeOff } from 'lucide-react';

interface Secret {
  id: string;
  name: string;
  type: 'api_key' | 'connection_string' | 'password' | 'token';
  value: string;
  lastRotated: Date;
  expiresIn: number; // days
}

export default function SecretsManager() {
  const [secrets] = useState<Secret[]>([
    {
      id: '1',
      name: 'DATABASE_PASSWORD',
      type: 'password',
      value: 'SuperSecurePass123!@#$%',
      lastRotated: new Date(Date.now() - 30 * 24 * 60 * 60000),
      expiresIn: 60,
    },
    {
      id: '2',
      name: 'AZURE_API_KEY',
      type: 'api_key',
      value: 'sk_live_aBcDeFgHiJkLmNoPqRsTuVw',
      lastRotated: new Date(Date.now() - 7 * 24 * 60 * 60000),
      expiresIn: 90,
    },
    {
      id: '3',
      name: 'STRIPE_SECRET_TOKEN',
      type: 'token',
      value: 'rk_test_XyZ9876543210AbCdEfGhIj',
      lastRotated: new Date(Date.now() - 45 * 24 * 60 * 60000),
      expiresIn: 30,
    },
  ]);

  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Sırlar Yöneticisi
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          API anahtarlarını, kimlik bilgilerini ve hassas yapılandırmaları yönetin
        </p>
      </div>

      {/* Secrets Table */}
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
                  Sır Adı
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Tür
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Değer
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Son Değiştirme
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Bitiş Tarihi
                </th>
                <th
                  className="px-6 py-3 text-left font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {secrets.map((secret) => (
                <tr key={secret.id} className="border-b hover:bg-accent-subtle" style={{ borderColor: 'var(--border-color)' }}>
                  <td
                    className="px-6 py-4 flex items-center gap-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Lock className="w-4 h-4" />
                    {secret.name}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {secret.type}
                  </td>
                  <td
                    className="px-6 py-4 font-mono text-xs"
                    style={{ color: revealedIds.has(secret.id) ? 'var(--text-primary)' : 'var(--text-tertiary)' }}
                  >
                    {revealedIds.has(secret.id) ? secret.value : '••••••••••••••'}
                  </td>
                  <td
                    className="px-6 py-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {secret.lastRotated.toLocaleDateString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-xs font-medium ${
                      secret.expiresIn < 30 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {secret.expiresIn} days
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => toggleReveal(secret.id)}
                        className="p-2 hover:bg-zinc-700/50 rounded transition-colors relative"
                        aria-label="Toggle reveal"
                        title={revealedIds.has(secret.id) ? 'Hide' : 'Reveal'}
                      >
                        {revealedIds.has(secret.id) ? (
                          <EyeOff className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(secret.id, secret.value)}
                        className="p-2 hover:bg-zinc-700/50 rounded transition-colors relative"
                        aria-label="Copy secret"
                        title={copiedId === secret.id ? 'Copied!' : 'Copy'}
                      >
                        <Copy className="w-4 h-4 text-zinc-400" />
                        {copiedId === secret.id && (
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-emerald-500 text-white px-2 py-1 rounded whitespace-nowrap">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
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
