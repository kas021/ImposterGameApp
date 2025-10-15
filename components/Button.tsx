import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'w-full font-bold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-4 transition-all duration-200 ease-in-out transform active:scale-95 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-on-primary)] focus:ring-[var(--color-primary-ring)] backdrop-blur-sm border border-[var(--color-primary-border)]',
    secondary: 'bg-[var(--color-secondary-bg)] hover:bg-[var(--color-secondary-bg-hover)] text-[var(--color-text-main)] focus:ring-gray-400 backdrop-blur-sm border border-[var(--color-secondary-border)]',
    danger: 'bg-red-600/80 hover:bg-red-600 text-white focus:ring-red-400 backdrop-blur-sm border border-red-500/50',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
