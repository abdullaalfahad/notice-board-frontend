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
  const { data: notices, isLoading, error } = useGetAllNotices();
  const [currentPage, setCurrentPage] = React.useState(1);

  const activeNotices = notices?.filter((n) => n.status === 'published').length || 0;
  const draftNotices = notices?.filter((n) => n.status === 'draft').length || 0;

  const totalPages = Math.ceil((notices?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedNotices = notices?.slice(startIndex, endIndex) || [];

  React.useEffect(() => {
    setCurrentPage(1);
  }, [notices?.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <NoticeHeader activeCount={activeNotices} draftCount={draftNotices} />
      <NoticeFilters />

      {isLoading ? (
        <NoticeTableSkeleton />
      ) : error || !notices || notices.length === 0 ? (
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
