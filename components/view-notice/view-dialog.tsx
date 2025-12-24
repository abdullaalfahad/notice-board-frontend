import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Notice } from '@/types/notice-types';
import { Label } from '../ui/label';

import { format } from 'date-fns';

function formatDate(dateString: string): string {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd MMMM, yyyy');
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleString(undefined, options);
}

export function NoticeViewDialog({
  notice,
  isOpen,
  setIsOpen,
}: {
  notice: Notice;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{notice.noticeTitle}</DialogTitle>
          <DialogDescription>
            Notice details • Published on {formatDate(notice.publishDate)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-muted-foreground">Notice Type</Label>
              <p className="font-medium capitalize">{notice.noticeType}</p>
            </div>

            <div className="grid gap-2">
              <Label className="text-muted-foreground">Target</Label>
              <p className="font-medium capitalize">
                {notice.targetType === 'individual' && notice.employeeName
                  ? `${notice.employeeName} (${notice.position || 'N/A'})`
                  : notice.targetType}
              </p>
            </div>

            <div className="grid gap-2">
              <Label className="text-muted-foreground">Status</Label>
              <p className="font-medium capitalize">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    notice.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {notice.status}
                </span>
              </p>
            </div>

            <div className="grid gap-2">
              <Label className="text-muted-foreground">Created</Label>
              <p className="font-medium">{formatDateTime(notice.createdAt)}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-muted-foreground">Notice Body</Label>
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
              {notice.noticeBody || (
                <span className="italic text-muted-foreground">No content</span>
              )}
            </div>
          </div>

          {notice.attachments && notice.attachments.length > 0 && (
            <div className="grid gap-2">
              <Label className="text-muted-foreground">
                Attachments ({notice.attachments.length})
              </Label>
              <div className="flex flex-col gap-2">
                {notice.attachments.map((attachment, index) => {
                  const fileName =
                    new URL(attachment).pathname.split('/').pop() || `Attachment ${index + 1}`;
                  return (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {fileName}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
