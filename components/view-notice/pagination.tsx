'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface NoticePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const NoticePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: NoticePaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('...');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show pages around current page
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        className="bg-transparent border-0 hover:bg-blue-50 hover:text-[#3B82F6]"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeft />
      </Button>
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-3.5 text-[#595F7A]">
              ...
            </span>
          );
        }

        const pageNum = page as number;
        return (
          <Button
            key={pageNum}
            variant="ghost"
            className={cn(
              'px-3.5 rounded bg-transparent hover:bg-blue-50 hover:text-[#3B82F6]',
              currentPage === pageNum
                ? 'border border-[#3B82F6] text-[#3B82F6]'
                : 'text-[#595F7A] border-0'
            )}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Button>
        );
      })}
      <Button
        variant="ghost"
        className="bg-transparent border-0 hover:bg-blue-50 hover:text-[#3B82F6]"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};
