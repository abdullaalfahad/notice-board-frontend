'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface NoticeTitleFieldProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

export function NoticeTitleField({ form }: NoticeTitleFieldProps) {
  return (
    <FormField
      control={form.control}
      name="noticeTitle"
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-sm font-medium text-[#1E293B]">
            <span className="text-[#EF4444] mr-1">*</span>
            Notice Title
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Write the Title of Notice"
              className="h-10 text-[#595F7A] border-[#CBD5E1] border"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

