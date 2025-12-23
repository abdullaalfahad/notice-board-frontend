'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface NoticeBodyFieldProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

export function NoticeBodyField({ form }: NoticeBodyFieldProps) {
  return (
    <FormField
      control={form.control}
      name="noticeBody"
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-sm font-medium text-[#1E293B]">Notice Body</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Write the details about notice"
              className="min-h-[120px] text-[#595F7A] border-[#CBD5E1] border"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

