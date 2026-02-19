'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface Transaction {
  id: string;
  date: Date;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  balance: number;
}

export default function TransactionLedger() {
  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date(Date.now() - 1000),
      type: 'debit',
      amount: 2450,
      description: 'AWS Compute Services',
      balance: 89550,
    },
    {
      id: '2',
      date: new Date(Date.now() - 60000),
      type: 'credit',
      amount: 5000,
      description: 'Monthly Credits',
      balance: 92000,
    },
    {
      id: '3',
      date: new Date(Date.now() - 180000),
      type: 'debit',
      amount: 1800,
      description: 'Azure Storage',
      balance: 87000,
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Transaction Ledger
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Complete financial transaction history and account balance tracking
        </p>
      </div>

      {/* Current Balance */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <p
          className="text-xs font-medium mb-2"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Current Balance
        </p>
        <p
          className="text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          $89,550.00
        </p>
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 rounded-lg border hover:shadow-2 transition-all"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-full flex items-center justify-center`}>
                  <span className={`inline-flex items-center justify-center h-3.5 w-3.5 rounded-full ${
                    tx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft className="w-3 h-3" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3" />
                    )}
                  </span>
                </div>
                <div className="flex-1">
                  <p
                    className="font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {tx.description}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {tx.date.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    tx.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Bal: ${tx.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
