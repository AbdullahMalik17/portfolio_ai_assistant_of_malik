'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isRequired?: boolean;
  isOptional?: boolean;
}

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isRequired?: boolean;
  isOptional?: boolean;
  characterCount?: number;
  maxCharacters?: number;
  onAIRefine?: () => void;
  isRefining?: boolean;
}

export function FloatingInput({
  label,
  isRequired = false,
  isOptional = false,
  id,
  value,
  className = '',
  ...props
}: FloatingInputProps) {
  const hasValue = value !== undefined && value !== '';

  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        className={`
          peer w-full px-5 pt-7 pb-3 rounded-xl
          bg-[color:var(--background)]
          border border-white/10
          focus:border-[color:var(--accent)]/50
          focus:ring-4 focus:ring-[color:var(--accent)]/10
          outline-none transition-all
          placeholder-transparent
          text-white
          ${className}
        `}
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-5 transition-all duration-300 pointer-events-none font-medium
          ${hasValue || props.placeholder
            ? 'top-2 text-[10px] uppercase tracking-widest text-[color:var(--accent)]'
            : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'
          }
          peer-focus:top-2
          peer-focus:text-[10px]
          peer-focus:uppercase
          peer-focus:tracking-widest
          peer-focus:text-[color:var(--accent)]
          peer-placeholder-shown:top-1/2
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:text-sm
          peer-placeholder-shown:text-gray-500
          peer-[:not(:placeholder-shown)]:top-2
          peer-[:not(:placeholder-shown)]:text-[10px]
          peer-[:not(:placeholder-shown)]:text-[color:var(--accent)]
        `}
      >
        {label}
        {isRequired && <span className="text-[color:var(--accent)] ml-1">*</span>}
        {isOptional && <span className="text-gray-600 text-[10px] ml-1 tracking-normal font-normal lowercase">(optional)</span>}
      </label>
    </div>
  );
}

export function FloatingTextarea({
  label,
  isRequired = false,
  isOptional = false,
  id,
  value,
  className = '',
  characterCount,
  maxCharacters,
  onAIRefine,
  isRefining = false,
  ...props
}: FloatingTextareaProps) {
  const hasValue = value !== undefined && value !== '';

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <div className="invisible">placeholder</div>
        {(onAIRefine || (characterCount !== undefined && maxCharacters)) && (
          <div className="flex items-center gap-4">
            {onAIRefine && (
              <button
                type="button"
                onClick={onAIRefine}
                disabled={isRefining || !hasValue}
                className="text-xs flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-500 border border-purple-500/20 hover:bg-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRefining ? (
                  <>
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Drafting...
                  </>
                ) : (
                  <>✨ Refine with AI</>
                )}
              </button>
            )}
            {characterCount !== undefined && maxCharacters && (
              <span className={`text-[10px] ${characterCount > maxCharacters ? 'text-red-500' : 'text-gray-400'}`}>
                {characterCount}/{maxCharacters}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          id={id}
          value={value}
          className={`
            peer w-full px-5 pt-7 pb-3 rounded-xl
            bg-[color:var(--background)]
            border border-white/10
            focus:border-[color:var(--accent)]/50
            focus:ring-4 focus:ring-[color:var(--accent)]/10
            outline-none transition-all
            placeholder-transparent
            resize-none font-sans text-sm text-white
            ${className}
          `}
          placeholder={label}
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute left-5 transition-all duration-300 pointer-events-none font-medium
            ${hasValue || props.placeholder
              ? 'top-2 text-[10px] uppercase tracking-widest text-[color:var(--accent)]'
              : 'top-7 text-sm text-gray-500'
            }
            peer-focus:top-2
            peer-focus:text-[10px]
            peer-focus:uppercase
            peer-focus:tracking-widest
            peer-focus:text-[color:var(--accent)]
            peer-placeholder-shown:top-7
            peer-placeholder-shown:text-sm
            peer-placeholder-shown:text-gray-500
            peer-[:not(:placeholder-shown)]:top-2
            peer-[:not(:placeholder-shown)]:text-[10px]
            peer-[:not(:placeholder-shown)]:text-[color:var(--accent)]
          `}
        >
          {label}
          {isRequired && <span className="text-[color:var(--accent)] ml-1">*</span>}
          {isOptional && <span className="text-gray-600 text-[10px] ml-1 tracking-normal font-normal lowercase">(optional)</span>}
        </label>
      </div>
    </div>
  );
}
