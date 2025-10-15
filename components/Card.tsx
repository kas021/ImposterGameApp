import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-[var(--color-card-bg)] backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--color-card-border)] p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
