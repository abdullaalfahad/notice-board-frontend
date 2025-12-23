import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Edit, Eye, MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface Notice {
  _id: string;
  targetType: string;
  noticeTitle: string;
  employeeId?: string;
  employeeName?: string;
  position?: string;
  noticeType: string;
  publishDate: string;
  noticeBody: string;
  attachments: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface NoticeTableProps {
  notices: Notice[];
}

export function NoticeTable({ notices }: NoticeTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDepartmentColor = (targetType: string, employeeName?: string) => {
    if (targetType === 'INDIVIDUAL') {
      return 'text-blue-600';
    }
    const colors = [
      'text-purple-600',
      'text-emerald-600',
      'text-orange-600',
      'text-blue-600',
      'text-pink-600',
      'text-red-600',
    ];
    const seed = (employeeName || targetType || '').toString();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      const chr = seed.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(notices.map((notice) => notice._id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const isAllSelected = notices.length > 0 && selectedRows.size === notices.length;

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="w-[50px] pl-5 font-medium text-gray-700">
              <Checkbox
                className="size-5 border-[#9CA3AF]"
                checked={isAllSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </TableHead>
            <TableHead className="font-medium text-gray-700">Title</TableHead>
            <TableHead className="font-medium text-gray-700">Notice Type</TableHead>
            <TableHead className="font-medium text-gray-700">Departments/Individual</TableHead>
            <TableHead className="font-medium text-gray-700">Published On</TableHead>
            <TableHead className="font-medium text-gray-700">Status</TableHead>
            <TableHead className="font-medium text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices?.map((notice) => (
            <TableRow key={notice._id} className="border-b border-gray-100 hover:bg-gray-50">
              <TableCell className="py-4 pl-5">
                <Checkbox
                  className="size-5 border-[#9CA3AF]"
                  checked={selectedRows.has(notice._id)}
                  onCheckedChange={(checked) => handleSelectRow(notice._id, checked as boolean)}
                  aria-label={`Select ${notice.noticeTitle}`}
                />
              </TableCell>
              <TableCell className="font-normal text-gray-900 py-4">{notice.noticeTitle}</TableCell>
              <TableCell className="text-gray-600 py-4">{notice.noticeType}</TableCell>
              <TableCell className="py-4">
                <span className={getDepartmentColor(notice.targetType, notice.employeeName)}>
                  {notice.targetType === 'INDIVIDUAL' && notice.employeeName
                    ? 'Individual'
                    : notice.targetType === 'ALL'
                    ? 'All Department'
                    : notice.employeeName || 'Department'}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 py-4">{formatDate(notice.publishDate)}</TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'px-2 py-1 rounded-md text-sm text-center font-medium',
                      notice.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 font-normal'
                        : notice.status === 'draft'
                        ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-0 font-normal'
                        : 'bg-gray-50 text-[#334155] hover:bg-gray-50 border-0 font-normal'
                    )}
                  >
                    {notice.status.charAt(0).toUpperCase() + notice.status.slice(1)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:text-gray-900"
                  >
                    <Eye className="size-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-600 hover:text-gray-900"
                  >
                    <Edit className="size-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-600 hover:text-gray-900"
                      >
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
