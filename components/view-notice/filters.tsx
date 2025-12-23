import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

export function NoticeFilters() {
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
      />
      <Select>
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
      <Button
        variant="outline"
        className="gap-2 bg-transparent text-[#595F7A] border-[#9096B1] border-[0.5px]"
      >
        Published on
        <Calendar className="h-4 w-4 text-[#8C92AF]" />
      </Button>
      <Button variant="ghost" className="text-[#3B82F6] border-[#3B82F6] border">
        Reset Filters
      </Button>
    </div>
  );
}
