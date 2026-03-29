import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label: string;
  error?: string;
  helperText?: string;
  className?: string;
}

interface InputProps extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  multiline?: false;
}

interface TextareaProps extends BaseProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  multiline: true;
}

type InputFieldProps = InputProps | TextareaProps;

export function InputField(props: InputFieldProps) {
  const { label, error, helperText, className = '', multiline, ...rest } = props;
  
  const id = rest.id || rest.name;
  
  // h-12 minimum according to PRD for panicked citizens using mobile phones
  const baseInputStyles = 'w-full min-h-[48px] px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-shadow disabled:bg-gray-50 disabled:text-gray-500';

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-gray-900">
        {label}
      </label>
      
      {props.multiline ? (
        <textarea
          id={id}
          className={`${baseInputStyles} resize-y min-h-[100px] ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={`${baseInputStyles} ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
