'use client';

import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface PublishDateFieldProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

export function PublishDateField({ form }: PublishDateFieldProps) {
  const publishDateValue = form.watch('publishDate');
  const [date, setDate] = React.useState<Date | undefined>(
    publishDateValue ? new Date(publishDateValue) : undefined
  );

  React.useEffect(() => {
    if (publishDateValue) {
      setDate(new Date(publishDateValue));
    }
  }, [publishDateValue]);

  return (
    <FormField
      control={form.control}
      name="publishDate"
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-sm font-medium text-[#1E293B]">
            <span className="text-[#EF4444]">*</span>
            Publish Date
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  type="button"
                  className={cn(
                    'w-full h-10 px-3 text-left font-normal text-[#595F7A] border border-[#CBD5E1] rounded-md bg-white flex items-center justify-between',
                    !date && 'text-[#94A3B8]'
                  )}
                >
                  <span>{date ? format(date, 'PPP') : 'Select Publishing Date'}</span>
                  <CalendarIcon className="h-4 w-4 text-[#8C92AF]" />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-white shadow-md border rounded-md"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate: Date | undefined) => {
                  setDate(selectedDate);
                  field.onChange(selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '');
                }}
                disabled={(date: Date) => date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
