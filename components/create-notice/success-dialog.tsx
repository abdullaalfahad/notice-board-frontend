'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  noticeTitle: string;
  noticeId?: string;
  onCreateAnother?: () => void;
}

export function SuccessDialog({
  isOpen,
  onClose,
  noticeTitle,
  noticeId,
  onCreateAnother,
}: SuccessDialogProps) {
  const router = useRouter();

  const handleViewNotice = () => {
    onClose();
    router.push('/');
  };

  const handleCreateAnother = () => {
    onClose();
    if (onCreateAnother) {
      onCreateAnother();
    } else {
      router.push('/create-notice');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px] px-12 py-16 gap-0" showCloseButton={false}>
        <DialogHeader>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center shadow-sm">
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
          </div>
          <DialogTitle className="text-3xl font-medium text-center text-[#1E293B] mb-4">
            Notice Published Successfully
          </DialogTitle>
          <DialogDescription className="text-base text-[#64748B] text-center max-w-[450px] mx-auto leading-relaxed">
            Your notice &quot;<span className="font-semibold text-[#1E293B]">{noticeTitle}</span>
            &quot; has been published and is now visible to all selected departments.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-row gap-3 sm:justify-center mt-10">
          <Button
            variant="outline"
            onClick={handleViewNotice}
            className="min-w-[140px] rounded-full border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/5 h-10"
          >
            View Notice
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateAnother}
            className="min-w-[160px] rounded-full border-[#F95524] text-[#F95524] hover:bg-[#FF5630]/5 h-10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Another
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="min-w-[100px] rounded-full border-[#232948] text-[#232948] hover:bg-slate-50 h-10"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
