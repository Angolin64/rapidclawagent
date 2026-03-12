"use client";

import { AgentPreset } from '@/lib/presets';

interface PresetCardProps {
  preset: AgentPreset;
}

export default function PresetCard({ preset }: PresetCardProps) {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">{preset.icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-white">{preset.name}</h3>
          <p className="text-sm text-slate-400">
            ${preset.monthlyEstimate.min}-${preset.monthlyEstimate.max}/mo
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-300 mb-4">{preset.description}</p>

      {/* Use Cases */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-400 mb-2">Use Cases:</h4>
        <ul className="space-y-1">
          {preset.useCase.slice(0, 3).map((useCase, i) => (
            <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Channels */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-400 mb-2">Channels:</h4>
        <div className="flex flex-wrap gap-2">
          {preset.channels.map((channel) => (
            <span
              key={channel}
              className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded"
            >
              {channel}
            </span>
          ))}
        </div>
      </div>

      {/* Model Stack */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-400 mb-2">Model Stack:</h4>
        <div className="text-xs text-slate-400 space-y-1">
          <div>
            <span className="text-cyan-400">Primary:</span>{' '}
            {preset.modelStack.primary.split('/').pop()}
          </div>
          <div>
            <span className="text-green-400">Heartbeat:</span>{' '}
            {preset.modelStack.heartbeat.split('/').pop()}
          </div>
          <div>
            <span className="text-blue-400">Sub-agents:</span>{' '}
            {preset.modelStack.subagents.split('/').pop()}
          </div>
        </div>
      </div>

      {/* Deploy Button */}
      <button
        onClick={() => {
          // TODO: Open deploy modal or scroll to install script
          window.location.hash = 'install';
        }}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-3 rounded-lg transition-all"
      >
        Deploy This Template
      </button>
    </div>
  );
}
