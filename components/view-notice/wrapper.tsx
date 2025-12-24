'use client';

import { useGetAllNotices } from '@/hooks/use-get-all-notices';
import * as React from 'react';
import { NoticeFilters } from './filters';
import { NoticeHeader } from './header';
import { NoticeNoData } from './no-data';
import { NoticePagination } from './pagination';
import { NoticeTable } from './table';
import { NoticeTableSkeleton } from './table-skeleton';

const ITEMS_PER_PAGE = 10;

export const NoticeWrapper = () => {
  const [status, setStatus] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [date, setDate] = React.useState<Date | undefined>();

  const { data: notices, isLoading, error } = useGetAllNotices(status);
  const [currentPage, setCurrentPage] = React.useState(1);

  const activeNotices = notices?.filter((n) => n.status === 'published').length || 0;
  const draftNotices = notices?.filter((n) => n.status === 'draft').length || 0;

  const filteredNotices = React.useMemo(() => {
    if (!notices) return [];
    return notices.filter((notice) => {
      const matchesSearch =
        !searchQuery ||
        notice.noticeTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.employeeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate =
        !date ||
        (notice.publishDate && new Date(notice.publishDate).toDateString() === date.toDateString());

      return matchesSearch && matchesDate;
    });
  }, [notices, searchQuery, date]);

  const totalPages = Math.ceil(filteredNotices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotices = filteredNotices.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [notices?.length, status, searchQuery, date]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleReset = () => {
    setStatus('');
    setSearchQuery('');
    setDate(undefined);
  };

  return (
    <div className="space-y-6">
      <NoticeHeader activeCount={activeNotices} draftCount={draftNotices} />
      <NoticeFilters
        status={status}
        onStatusChange={setStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        date={date}
        onDateChange={setDate}
        onReset={handleReset}
      />

      {isLoading ? (
        <NoticeTableSkeleton />
      ) : error || !notices ? (
        <NoticeNoData />
      ) : (
        <>
          <NoticeTable notices={paginatedNotices} />
          {totalPages > 1 && (
            <NoticePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};
