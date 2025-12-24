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
      <DialogContent className="sm:max-w-[500px] p-8" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#10B981] flex items-center justify-center">
              <Check className="h-10 w-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-[#1E293B] mb-3">
            Notice Published Successfully
          </DialogTitle>
          <DialogDescription className="text-base text-[#64748B]">
            Your notice &quot;{noticeTitle}&quot; has been published and is now visible to all
            selected departments.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-row gap-3 justify-center mt-6">
          <Button
            variant="outline"
            onClick={handleViewNotice}
            className="min-w-[140px] border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10"
          >
            View Notice
          </Button>
          <Button
            variant="outline"
            onClick={handleCreateAnother}
            className="min-w-[160px] border-[#F97316] text-[#F97316] hover:bg-[#F97316]/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Another
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="min-w-[100px] border-[#CBD5E1] text-[#64748B] hover:bg-[#F5F6FA]"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
