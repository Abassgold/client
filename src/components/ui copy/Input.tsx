import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  fullWidth = false,
  ...props
}, ref) => {
  const widthClass = fullWidth ? 'w-full' : '';
  return <div className={`${widthClass}`}>
        {label && <label htmlFor={props.id} className="block text-sm font-medium text-secondary-900 dark:text-secondary-200 mb-1">
            {label}
          </label>}
        <div className="relative">
          {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-secondary-500">
              {leftIcon}
            </div>}
          <input ref={ref} className={`
              block bg-white dark:bg-secondary-900 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-secondary-300 dark:border-secondary-700 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600'} 
              rounded-md shadow-sm py-2 ${leftIcon ? 'pl-10' : 'pl-3'} ${rightIcon ? 'pr-10' : 'pr-3'}
              text-secondary-900 dark:text-white sm:text-sm ${widthClass} ${className}
            `} {...props} />
          {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-500">
              {rightIcon}
            </div>}
        </div>
        {(helperText || error) && <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-secondary-500'}`}>
            {error || helperText}
          </p>}
      </div>;
});
Input.displayName = 'Input';