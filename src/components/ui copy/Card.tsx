import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card: React.FC<CardProps> = ({
  children,
  className = ''
}) => {
  return <div className={`bg-white dark:bg-[#1f2229] rounded-lg border border-[#d8deeb] dark:border-[#3f4552] shadow-sm ${className}`}>
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
  return <div className={`px-4 py-3 border-b border-[#d8deeb] dark:border-[#3f4552] ${className}`}>
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
  return <h3 className={`text-lg font-medium text-[#1f2229] dark:text-white ${className}`}>
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
  return <p className={`text-sm text-[#7e8aa4] dark:text-[#b1bdd7] ${className}`}>
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
  return <div className={`px-4 py-3 border-t border-[#d8deeb] dark:border-[#3f4552] ${className}`}>
      {children}
    </div>;
};