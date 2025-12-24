'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useDeleteFile, useUploadFile } from '@/hooks/use-upload-file';
import { cn } from '@/lib/utils';
import { CloudUpload, FileText, Loader2, X } from 'lucide-react';
import * as React from 'react';

interface UploadedFile {
  filename: string;
  url: string;
  publicId: string;
  format: string;
  size: number;
  resourceType: string;
}

interface FileUploadProps {
  label?: string;
  acceptedTypes?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  onUploadComplete?: (uploadedFiles: UploadedFile[]) => void;
  className?: string;
  autoUpload?: boolean;
}

export function FileUpload({
  label = 'Upload Attachments (optional)',
  acceptedTypes = 'jpg, png',
  value = [],
  onChange,
  onUploadComplete,
  className,
  autoUpload = false,
}: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>(value);
  const [isDragging, setIsDragging] = React.useState(false);
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutateAsync: deleteFile } = useDeleteFile();
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setFiles(value);
  }, [value]);

  const uploadFiles = async (filesToUpload: File[]) => {
    setError(null);

    try {
      const data = await uploadFile(filesToUpload);

      setUploadedFiles((prev) => [...prev, ...data?.data]);
      onUploadComplete?.(data?.data);

      console.log(data?.data);

      // Clear files after successful upload
      setFiles([]);
      onChange?.([]);

      return data.files;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      console.error('Upload error:', err);
    }
  };

  const handleFileChange = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);

    // Auto-upload if enabled
    if (autoUpload) {
      await uploadFiles(newFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleRemoveUploadedFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];

    try {
      await deleteFile(fileToRemove.publicId);
      setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Delete error:', err);
    }
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

  const handleManualUpload = () => {
    if (files.length > 0) {
      uploadFiles(files);
    }
  };

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-sm font-medium text-[#1E293B]">{label}</Label>

      <div
        className={cn(
          'border-[2px] border-dotted border-[#10B981] rounded-lg p-10 text-center transition-colors bg-white',
          isDragging ? 'bg-[#10B981]/5' : '',
          'cursor-pointer hover:bg-[#10B981]/5',
          isUploading && 'opacity-50 pointer-events-none'
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
          accept={acceptedTypes
            .split(',')
            .map((t) => `.${t.trim()}`)
            .join(',')}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={isUploading}
        />

        {isUploading ? (
          <>
            <Loader2 className="h-10 w-10 mx-auto mb-4 text-[#10B981] animate-spin" />
            <p className="text-sm text-slate-500">Uploading files...</p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <CloudUpload className="h-10 w-10 text-[#10B981] mb-2" />
            <p className="text-sm font-medium text-slate-700">
              <span className="text-[#10B981] font-semibold">Upload</span> nominee profile image or
              drag and drop.
            </p>
            <p className="text-xs text-slate-400">Accepted File Type: {acceptedTypes}</p>
          </div>
        )}
      </div>

      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

      {/* Pending files (not yet uploaded) */}
      {files.length > 0 && (
        <div className="space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {files?.map((file, index) => (
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
            {!autoUpload && (
              <Button type="button" size="sm" onClick={handleManualUpload} disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload All'
                )}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Uploaded files */}
      {uploadedFiles?.length > 0 && (
        <div className="space-y-2 mt-2">
          <p className="text-sm font-medium text-green-600">Uploaded files:</p>
          <div className="flex flex-wrap gap-2">
            {uploadedFiles?.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-sm text-foreground"
              >
                <FileText className="h-4 w-4 text-green-600" />
                <span className="max-w-[200px] truncate">{file.filename}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveUploadedFile(index);
                  }}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
