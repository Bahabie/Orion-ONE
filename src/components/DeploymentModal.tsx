import React, { useState } from "react";

export interface Deployment {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (deployment: Deployment) => void;
}

export default function DeploymentModal({ isOpen, onClose, onAdd }: DeploymentModalProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("inProgress");

  if (!isOpen) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      id: Date.now().toString(),
      name,
      status,
      createdAt: new Date().toISOString(),
    });
    setName("");
    setStatus("inProgress");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">New Deployment</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Deployment Name</label>
          <input
            className="w-full border rounded px-3 py-2 bg-zinc-50 dark:bg-zinc-800"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="w-full border rounded px-3 py-2 bg-zinc-50 dark:bg-zinc-800"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="inProgress">In Progress</option>
            <option value="deployed">Deployed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-zinc-200 dark:bg-zinc-700">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
        </div>
      </form>
    </div>
  );
}
