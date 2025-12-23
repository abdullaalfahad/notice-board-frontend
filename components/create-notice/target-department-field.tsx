'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface TargetDepartmentFieldProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

export function TargetDepartmentField({ form }: TargetDepartmentFieldProps) {
  return (
    <div className="bg-[#F5F6FA] rounded-md p-4">
      <FormField
        control={form.control}
        name="targetType"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-sm font-medium text-[#1E293B]">
              <span className="text-[#EF4444] mr-1">*</span>
              Target Department(s) or Individual
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-10 text-[#595F7A] border-[#CBD5E1] border">
                  <SelectValue />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
