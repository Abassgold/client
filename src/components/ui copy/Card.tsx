import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps> = ({
  children,
  className = ''
}) => {
  return <div className={`bg-white dark:bg-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800 shadow-sm ${className}`}>
      {children}
    </div>;
};
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => {
  return <div className={`px-4 py-3 border-b border-secondary-200 dark:border-secondary-800 ${className}`}>
      {children}
    </div>;
};
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}
export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = ''
}) => {
  return <h3 className={`text-lg font-medium text-secondary-900 dark:text-white ${className}`}>
      {children}
    </h3>;
};
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className = ''
}) => {
  return <p className={`text-sm text-secondary-600 dark:text-secondary-400 ${className}`}>
      {children}
    </p>;
};
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}
export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = ''
}) => {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
};
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = ''
}) => {
  return <div className={`px-4 py-3 border-t border-secondary-200 dark:border-secondary-800 ${className}`}>
      {children}
    </div>;
};