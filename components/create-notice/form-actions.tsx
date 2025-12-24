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
    <div className="flex items-center gap-3 justify-end mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="min-w-[120px] rounded-full text-slate-600 border-slate-300 bg-transparent hover:bg-slate-50 h-11"
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onSaveDraft}
        disabled={isLoading}
        className="min-w-[150px] rounded-full border-[#3B82F6] text-[#3B82F6] bg-transparent hover:bg-[#3B82F6]/10 h-11"
      >
        Save as Draft
      </Button>
      <Button
        type="submit"
        onClick={onPublish}
        disabled={isLoading}
        className="min-w-[180px] rounded-full bg-[#FF5630] hover:bg-[#FF5630]/90 text-white h-11 shadow-sm"
      >
        <Check className="h-4 w-4 mr-2" />
        Publish Notice
      </Button>
    </div>
  );
}
