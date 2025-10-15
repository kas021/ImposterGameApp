import React from 'react';

interface ToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, enabled, onChange }) => {
  const enabledClass = enabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-toggle-bg-off)]';
  
  return (
    <div className="flex items-center justify-between w-full py-2">
      <span className="text-lg text-[var(--color-text-main)]/90">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background-main)] focus:ring-[var(--color-accent)] ${enabledClass}`}
      >
        <span
          className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
