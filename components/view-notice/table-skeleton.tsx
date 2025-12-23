'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function NoticeTableSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 border-b border-gray-200">
            <TableHead className="w-[50px] pl-5 font-medium text-gray-700">
              <Checkbox className="size-5 border-[#9CA3AF]" disabled />
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
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="py-4 pl-5">
                <Checkbox className="size-5 border-[#9CA3AF]" disabled />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
              </TableCell>
              <TableCell className="py-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

