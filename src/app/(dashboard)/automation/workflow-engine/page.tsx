'use client';

import React, { useState } from 'react';
import { useModule, ActiveTask } from '@/contexts/ModuleContext';
import { Play, Pause, RotateCcw, Trash2, Plus } from 'lucide-react';

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-zinc-400 to-zinc-300 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TaskCard({ task, onUpdate, onRemove }: { task: ActiveTask; onUpdate: (updates: Partial<ActiveTask>) => void; onRemove: () => void }) {
  const isRunning = task.status === 'running';
  const isCompleted = task.status === 'completed';
  const isFailed = task.status === 'failed';

  const statusColor = {
    pending: 'var(--status-info-bg)',
    running: 'rgba(59, 130, 246, 0.1)',
    completed: 'var(--status-success-bg)',
    failed: 'var(--status-warning-bg)',
  };

  const statusTextColor = {
    pending: 'var(--text-secondary)',
    running: '#3b82f6',
    completed: 'var(--status-success)',
    failed: 'var(--status-warning)',
  };

  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3
            className="text-sm font-semibold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            {task.name}
          </h3>
          <p
            className="text-xs"
            style={{
              color: statusTextColor[task.status],
              fontWeight: '500',
            }}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </p>
        </div>
        <div className="flex gap-2">
          {!isCompleted && !isFailed && (
            <button
              onClick={() =>
                onUpdate({
                  status: isRunning ? 'pending' : 'running',
                })
              }
              className="p-2 rounded hover:bg-accent-subtle transition-colors"
              aria-label={isRunning ? 'Pause task' : 'Resume task'}
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          )}
          {(isCompleted || isFailed) && (
            <button
              onClick={() => onUpdate({ status: 'pending', progress: 0 })}
              className="p-2 rounded hover:bg-accent-subtle transition-colors"
              aria-label="Retry task"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onRemove}
            className="p-2 rounded hover:bg-accent-subtle transition-colors text-red-500"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between mb-2">
          <label
            className="text-xs font-medium"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Progress
          </label>
          <span
            className="text-xs font-semibold"
            style={{ color: 'var(--text-secondary)' }}
          >
            {task.progress}%
          </span>
        </div>
        <ProgressBar progress={task.progress} />
      </div>

      {/* Timeline */}
      <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        <span>Started: {task.startedAt.toLocaleTimeString()}</span>
        {task.completedAt && (
          <span>
            • Completed: {task.completedAt.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}

export default function WorkflowEngine() {
  const { activeTasks, addTask, updateTask, removeTask } = useModule();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim()) {
      addTask({
        id: Date.now().toString(),
        name: taskName,
        status: 'pending',
        progress: 0,
      });
      setTaskName('');
    }
  };

  // Simulate progress for running tasks
  React.useEffect(() => {
    const interval = setInterval(() => {
      activeTasks.forEach((task) => {
        if (task.status === 'running' && task.progress < 100) {
          updateTask(task.id, {
            progress: Math.min(100, task.progress + Math.random() * 15),
          });
        } else if (task.status === 'running' && task.progress >= 100) {
          updateTask(task.id, {
            status: 'completed',
            progress: 100,
            completedAt: new Date(),
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTasks, updateTask]);

  const runningCount = activeTasks.filter((t) => t.status === 'running').length;
  const completedCount = activeTasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="flex flex-col gap-6 p-8">
      {/* Header */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Workflow Engine
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Manage and execute background jobs with real-time progress tracking
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Tasks', value: activeTasks.length },
          { label: 'Running', value: runningCount },
          { label: 'Completed', value: completedCount },
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

      {/* Add Task Form */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
      >
        <label
          className="text-sm font-medium mb-3 block"
          style={{ color: 'var(--text-primary)' }}
        >
          Create New Task
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            placeholder="Enter task name..."
            className="flex-1 px-3 py-2 rounded-lg border text-sm transition-colors"
            style={{
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
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
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {activeTasks.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
            }}
          >
            <p
              className="text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              No tasks yet. Create one to get started.
            </p>
          </div>
        ) : (
          activeTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={(updates) => updateTask(task.id, updates)}
              onRemove={() => removeTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
