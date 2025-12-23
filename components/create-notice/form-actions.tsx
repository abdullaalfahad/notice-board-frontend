'use client';

import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface FormActionsProps {
  onCancel?: () => void;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  isLoading?: boolean;
}

export function FormActions({ onCancel, onSaveDraft, onPublish, isLoading }: FormActionsProps) {
  return (
    <div className="flex items-center gap-4 justify-end pt-6 mt-6 border-t border-[#E2E8F0]">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="min-w-[100px] border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6]/10"
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={isLoading}
        className="min-w-[140px] border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20"
      >
        Save as Draft
      </Button>
      <Button
        type="submit"
        onClick={onPublish}
        disabled={isLoading}
        className="min-w-[160px] bg-[#FF3E01] text-white hover:bg-[#FF3E01]/90"
      >
        <Check className="h-4 w-4 mr-2" />
        Publish Notice
      </Button>
    </div>
  );
}

