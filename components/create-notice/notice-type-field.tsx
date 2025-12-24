'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface NoticeTypeFieldProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

const NOTICE_TYPES = [
  'Warning / Disciplinary',
  'Performance Improvement',
  'Appreciation / Recognitio',
  'Attendance / Leave Issue',
  'Payroll / Compensation',
  'Contract / Role Update',
  'Advisory / Personal Reminder',
];

export function NoticeTypeField({ form }: NoticeTypeFieldProps) {
  return (
    <FormField
      control={form.control}
      name="noticeType"
      render={({ field }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-sm font-medium text-[#1E293B]">
            <span className="text-[#EF4444]">*</span>
            Notice Type
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  type="button"
                  className={cn(
                    'w-full h-10 px-3 text-left font-normal text-[#595F7A] border border-[#CBD5E1] rounded-md bg-white flex items-center justify-between',
                    !field.value && 'text-[#94A3B8]'
                  )}
                >
                  <span>{field.value || 'Select Notice Type'}</span>
                  <svg
                    className="h-4 w-4 opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4" align="start">
              <div className="space-y-2">
                {NOTICE_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox
                      checked={field.value === type}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? type : '');
                      }}
                    />
                    <label
                      className="text-sm font-normal text-[#1E293B] cursor-pointer flex-1"
                      onClick={() => {
                        field.onChange(field.value === type ? '' : type);
                      }}
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
