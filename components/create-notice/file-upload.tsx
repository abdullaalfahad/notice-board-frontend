'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CloudUpload, FileText, X } from 'lucide-react';
import * as React from 'react';

interface FileUploadProps {
  label?: string;
  acceptedTypes?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  className?: string;
}

export function FileUpload({
  label = 'Upload Attachments (optional)',
  acceptedTypes = 'jpg, png',
  value = [],
  onChange,
  className,
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>(value);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    setFiles(value);
  }, [value]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-sm font-medium text-[#1E293B]">{label}</Label>
      <div
        className={cn(
          'border-2 border-dashed rounded-md p-8 text-center transition-colors',
          isDragging ? 'border-primary bg-primary/5' : 'border-[#CBD5E1] bg-transparent',
          'cursor-pointer hover:border-primary/50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.split(',').map((t) => `.${t.trim()}`).join(',')}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        <CloudUpload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">
          Upload nominee profile image or drag and drop.
        </p>
        <p className="text-xs text-muted-foreground">Accepted File Type: {acceptedTypes}</p>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F6FA] rounded-full text-sm text-foreground"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="max-w-[200px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

