import type { InputHTMLAttributes, ReactNode } from "react";

const inputClass =
  "text-body h-11 w-full rounded-full border border-line bg-surface px-4 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-brand/40 focus:ring-2 focus:ring-brand/15";

type HostFieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function HostField({
  id,
  label,
  hint,
  error,
  className = "",
  ...props
}: HostFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-baseline justify-between gap-3 px-1">
        <label htmlFor={id} className="text-caption font-medium text-foreground/80">
          {label}
        </label>
        {hint ? (
          <span className="text-caption text-muted">{hint}</span>
        ) : null}
      </div>
      <input id={id} className={inputClass} aria-invalid={error ? true : undefined} {...props} />
      {error ? (
        <p className="text-caption px-1 text-brand" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type HostCheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
};

export function HostCheckbox({
  id,
  checked,
  onChange,
  error,
  children,
}: HostCheckboxProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-body flex cursor-pointer items-start gap-3 text-foreground/85"
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 size-4 shrink-0 rounded border-line accent-brand"
          aria-invalid={error ? true : undefined}
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="text-caption px-1 text-brand" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
