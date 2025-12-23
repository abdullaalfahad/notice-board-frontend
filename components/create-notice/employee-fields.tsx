'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CreateNoticeFormData } from './schema';

interface EmployeeFieldsProps {
  form: UseFormReturn<CreateNoticeFormData>;
}

export function EmployeeFields({ form }: EmployeeFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <FormField
        control={form.control}
        name="employeeId"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-sm font-medium text-[#1E293B]">
              <span className="text-[#EF4444] mr-1">*</span>
              Select Employee ID
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="w-full h-10 text-[#595F7A] border-[#CBD5E1] border">
                  <SelectValue placeholder="Select employee id" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="emp001">EMP001</SelectItem>
                <SelectItem value="emp002">EMP002</SelectItem>
                <SelectItem value="emp003">EMP003</SelectItem>
                <SelectItem value="emp004">EMP004</SelectItem>
                <SelectItem value="emp005">EMP005</SelectItem>
                <SelectItem value="emp006">EMP006</SelectItem>
                <SelectItem value="emp007">EMP007</SelectItem>
                <SelectItem value="emp008">EMP008</SelectItem>
                <SelectItem value="emp009">EMP009</SelectItem>
                <SelectItem value="emp010">EMP010</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employeeName"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-sm font-medium text-[#1E293B]">
              <span className="text-[#EF4444] mr-1">*</span>
              Employee Name
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter employee full name"
                className="h-10 text-[#595F7A] border-[#CBD5E1] border"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="position"
        render={({ field }) => (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-sm font-medium text-[#1E293B]">
              <span className="text-[#EF4444] mr-1">*</span>
              Position
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Select employee position"
                className="h-10 text-[#595F7A] border-[#CBD5E1] border"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

