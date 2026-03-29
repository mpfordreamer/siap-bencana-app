import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all px-8 py-3 rounded-sm text-center disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-brand-accent text-white shadow-sm hover:brightness-110 hover:-translate-y-0.5',
    secondary: 'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    outline: 'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white', // Alias for secondary per PRD specs
    destructive: 'bg-triage-critical text-white hover:opacity-90',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {props.children}
    </button>
  );
}
