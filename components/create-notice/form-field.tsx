'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

export function FormField({ label, required, children, className, error }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label className="text-sm font-medium text-foreground">
        {required && <span className="text-destructive mr-1">*</span>}
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

