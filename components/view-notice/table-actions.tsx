import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useUpdateNoticeStatus } from '@/hooks/use-update-notice-status';
import { cn } from '@/lib/utils';
import { Notice } from '@/types/notice-types';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

export const TableActions = ({ notice }: { notice: Notice }) => {
  const { mutate: updateStatus } = useUpdateNoticeStatus();

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
        <Eye className="size-5" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
            <Edit className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="flex justify-between items-center gap-4">
            <div
              className={cn(
                'text-sm font-medium capitalize',
                notice?.status === 'published' ? 'text-[#059669]' : 'text-[#334155]'
              )}
            >
              {notice?.status || 'draft'}
            </div>

            <Switch
              id="published"
              checked={notice?.status === 'published'}
              onCheckedChange={(checked) => {
                updateStatus({
                  noticeId: notice._id,
                  status: checked ? 'published' : 'unpublished',
                });
              }}
              className="data-[state=checked]:bg-[#059669] data-[state=unchecked]:bg-[#334155]"
            />
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600 hover:text-gray-900">
            <MoreVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
