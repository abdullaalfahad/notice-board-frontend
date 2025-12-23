import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';

interface NoticeHeaderProps {
  activeCount: number;
  draftCount: number;
}

export function NoticeHeader({ activeCount, draftCount }: NoticeHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Notice Management</h1>
        <div className="mt-1 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-success">Active Notices:</span>
            <span className="text-sm text-success">{activeCount}</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-warning">Draft Notice:</span>
            <span className="text-sm text-warning">{draftCount}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-1 h-4 w-4" />
          Create Notice
        </Button>
        <Button
          variant="outline"
          className="border-[#F59E0B] text-[#F59E0B] hover:bg-accent bg-transparent"
        >
          <Pencil className="mr-1 h-4 w-4" />
          All Draft Notice
        </Button>
      </div>
    </div>
  );
}
