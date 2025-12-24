'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CreateNoticeHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-md border-[#9CA3AF] border h-8 hover:bg-[#E5E7EB]"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 text-foreground" />
      </Button>
      <h1 className="text-xl font-semibold text-foreground">Create a Notice</h1>
    </div>
  );
}
