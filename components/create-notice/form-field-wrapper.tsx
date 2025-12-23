'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

export function FormFieldWrapper({
  name,
  label,
  required,
  children,
  description,
  className,
}: FormFieldWrapperProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-medium text-foreground">
            {required && <span className="text-destructive mr-1">*</span>}
            {label}
          </FormLabel>
          <FormControl>{React.cloneElement(children as React.ReactElement, { ...field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

