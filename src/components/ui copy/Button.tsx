import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-secondary-900';
  const variantClasses = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900',
    secondary: 'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 active:bg-secondary-400 dark:bg-secondary-800 dark:text-white dark:hover:bg-secondary-700',
    outline: 'border border-secondary-300 dark:border-secondary-700 text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800',
    ghost: 'text-secondary-900 dark:text-white hover:bg-secondary-100 dark:hover:bg-secondary-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800'
  };
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';
  return <button type={type} onClick={onClick} disabled={disabled} className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${disabledClasses} 
        ${widthClass} 
        ${className}
      `}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>;
};