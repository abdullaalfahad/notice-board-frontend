import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

interface NoticeFiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onReset: () => void;
}

export function NoticeFilters({
  status,
  onStatusChange,
  searchQuery,
  onSearchChange,
  date,
  onDateChange,
  onReset,
}: NoticeFiltersProps) {
  return (
    <div className="flex items-center gap-4 justify-end">
      <span className="text-sm font-medium text-[#232948]">Filter by:</span>
      <Select defaultValue="departments">
        <SelectTrigger className="w-[230px] text-[#595F7A] border-[#9096B1] border-[0.5px]">
          <SelectValue placeholder="Select filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="departments">Departments or individuals</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Employee Id or Name"
        className="max-w-[200px] text-[#595F7A] border-[#9096B1] border-[0.5px]"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px] text-[#595F7A] border-[#9096B1] border-[0.5px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="unpublished">Unpublished</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'gap-2 bg-transparent text-[#595F7A] border-[#9096B1] border-[0.5px]',
              !date && 'text-[#595F7A]'
            )}
          >
            {date ? format(date, 'PPP') : 'Published on'}
            <CalendarIcon className="h-4 w-4 text-[#8C92AF]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-md border rounded-md" align="end">
          <Calendar mode="single" selected={date} onSelect={onDateChange} initialFocus />
        </PopoverContent>
      </Popover>

      <Button variant="ghost" className="text-[#3B82F6] border-[#3B82F6] border" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}
