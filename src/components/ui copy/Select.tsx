import React, { forwardRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface SelectOption {
  value: string;
  label: string;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}
export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  label,
  helperText,
  error,
  className = '',
  fullWidth = false,
  onChange,
  ...props
}, ref) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return <div className={`${widthClass}`}>
        {label && <label htmlFor={props.id} className="block text-sm font-medium text-slate-900 dark:text-slate-200 mb-1">
            {label}
          </label>}
        <div className="relative">
          <select ref={ref} className={`
              block bg-white dark:bg-slate-900 border ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-300 dark:border-slate-700 focus:ring-teal-500 focus:border-teal-500 dark:focus:ring-teal-600 dark:focus:border-teal-600'} 
              rounded-md shadow-sm py-2 pl-3 pr-10
              text-slate-900 dark:text-white sm:text-sm appearance-none ${widthClass} ${className}
            `} onChange={handleChange} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </div>
        </div>
        {(helperText || error) && <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-slate-500'}`}>
            {error || helperText}
          </p>}
      </div>;
});
Select.displayName = 'Select';