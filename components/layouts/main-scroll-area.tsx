'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export const MainScrollArea = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const shouldHideScrollbar = pathname === '/' || pathname === '/create-notice';

  return (
    <main
      className={cn(
        'flex-1 overflow-y-auto bg-[#F5F6FA] px-5 py-7',
        shouldHideScrollbar &&
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
      )}
    >
      {children}
    </main>
  );
};
