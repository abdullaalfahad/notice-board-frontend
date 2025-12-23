'use client';

import { useGetAllNotices } from '@/hooks/use-get-all-notices';
import { NoticeFilters } from './filters';
import { NoticeHeader } from './header';
import { NoticePagination } from './pagination';
import { NoticeTable } from './table';

export const NoticeWrapper = () => {
  const { data: notices, isLoading, error } = useGetAllNotices();

  const activeNotices = notices?.filter((n) => n.status === 'published').length;
  const draftNotices = notices?.filter((n) => n.status === 'draft').length;

  return (
    <div className="space-y-6">
      <NoticeHeader activeCount={activeNotices as number} draftCount={draftNotices as number} />
      <NoticeFilters />
      <NoticeTable notices={notices!} />
      <NoticePagination />
    </div>
  );
};
