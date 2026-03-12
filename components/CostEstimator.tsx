"use client";

import { useState } from 'react';
import { PRESETS, calculateMonthlyCost } from '@/lib/presets';

export default function CostEstimator() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0].id);
  const [messagesPerDay, setMessagesPerDay] = useState(30);

  const preset = PRESETS.find(p => p.id === selectedPreset)!;
  const totalCost = calculateMonthlyCost(preset, messagesPerDay);

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 border border-slate-700 rounded-lg p-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        💰 Cost Estimator
      </h2>
      <p className="text-slate-400 text-center mb-8">
        See how much your AI agent will cost based on usage
      </p>

      {/* Preset Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Select Template:
        </label>
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500"
        >
          {PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.icon} {preset.name}
            </option>
          ))}
        </select>
      </div>

      {/* Messages Slider */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-300 mb-2">
          Messages per day: <span className="text-cyan-400">{messagesPerDay}</span>
        </label>
        <input
          type="range"
          min="10"
          max="200"
          step="10"
          value={messagesPerDay}
          onChange={(e) => setMessagesPerDay(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Light (10/day)</span>
          <span>Moderate (50/day)</span>
          <span>Heavy (200/day)</span>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Monthly Cost Breakdown</h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-300">
            <span>VPS Hosting (Hostinger KVM2)</span>
            <span className="font-mono">$6.99</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>API Usage ({preset.modelStack.primary.split('/').pop()})</span>
            <span className="font-mono">${(totalCost - 7).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span className="pl-4">↳ Primary model</span>
            <span className="font-mono">${((totalCost - 7) * 0.7).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span className="pl-4">↳ Heartbeats</span>
            <span className="font-mono">${((totalCost - 7) * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span className="pl-4">↳ Sub-agents</span>
            <span className="font-mono">${((totalCost - 7) * 0.2).toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-white">Total Monthly Cost:</span>
          <span className="text-3xl font-bold text-cyan-400">${totalCost}</span>
        </div>

        <div className="mt-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <p className="text-sm text-cyan-300">
            💡 <strong>Savings vs Unoptimized:</strong> ~60-80% less than using Claude Sonnet for everything
          </p>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">❌</span>
            <h4 className="font-semibold text-red-300">Without Optimization</h4>
          </div>
          <p className="text-sm text-red-200 mb-2">
            Claude Sonnet for everything + no limits
          </p>
          <p className="text-2xl font-bold text-red-400">
            ${Math.round(totalCost * 3.5)}/mo
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✅</span>
            <h4 className="font-semibold text-green-300">With RapidClawAgent</h4>
          </div>
          <p className="text-sm text-green-200 mb-2">
            Smart model routing + context limits
          </p>
          <p className="text-2xl font-bold text-green-400">
            ${totalCost}/mo
          </p>
        </div>
      </div>
    </div>
  );
}
