import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className = '',
      fullWidth = false,
      leftAddon,
      rightAddon,
      ...props
    },
    ref
  ) => {
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <div className={`${widthClass}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1"
          >
            {label}
          </label>
        )}

        <div className="flex items-center">
          {/* Left Addon */}
          {leftAddon && (
            <span className="px-3 py-2 border border-r-0 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-l-md">
              {leftAddon}
            </span>
          )}

          <div className="relative flex-1">
            {leftIcon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                {leftIcon}
              </div>
            )}
            <input
              ref={ref}
              className={`
                block bg-white dark:bg-slate-900 border 
                ${
                  error
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-600 dark:focus:border-teal-600'
                } 
                shadow-sm py-2 
                ${leftIcon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'}
                text-slate-900 dark:text-white sm:text-sm ${widthClass} ${className}
                ${leftAddon ? 'rounded-l-none' : 'rounded-l-md'}
                ${rightAddon ? 'rounded-r-none' : 'rounded-r-md'}
              `}
              {...props}
            />
            {rightIcon && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500">
                {rightIcon}
              </div>
            )}
          </div>

          {/* Right Addon */}
          {rightAddon && (
            <span className="px-3 py-2 border border-l-0 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-r-md">
              {rightAddon}
            </span>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={`mt-1 text-sm ${
              error ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
