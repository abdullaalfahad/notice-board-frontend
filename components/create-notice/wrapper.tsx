'use client';

import { Form } from '@/components/ui/form';
import { useCreateNotice } from '@/hooks/use-create-notice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { EmployeeFields } from './employee-fields';
import { FileUpload } from './file-upload';
import { FormActions } from './form-actions';
import { CreateNoticeHeader } from './header';
import { NoticeBodyField } from './notice-body-field';
import { NoticeTitleField } from './notice-title-field';
import { NoticeTypeField } from './notice-type-field';
import { PublishDateField } from './publish-date-field';
import { createNoticeSchema, type CreateNoticeFormData } from './schema';
import { SuccessDialog } from './success-dialog';
import { TargetDepartmentField } from './target-department-field';

export function CreateNoticeWrapper() {
  const router = useRouter();
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = React.useState<string[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const [publishedNoticeTitle, setPublishedNoticeTitle] = React.useState('');
  const createNoticeMutation = useCreateNotice();

  const form = useForm<CreateNoticeFormData>({
    resolver: zodResolver(createNoticeSchema),
    defaultValues: {
      targetType: 'INDIVIDUAL',
      noticeTitle: '',
      employeeId: '',
      employeeName: '',
      position: '',
      noticeType: '',
      publishDate: '',
      noticeBody: '',
      attachments: [],
    },
  });

  const handleCancel = () => {
    router.back();
  };

  const handleUploadComplete = (uploadedFiles: { url: string }[]) => {
    const urls = uploadedFiles?.map((f) => f.url);
    setUploadedUrls((prev) => [...prev, ...urls]);
  };

  const handleSaveDraft = async (data: CreateNoticeFormData) => {
    try {
      await createNoticeMutation.mutateAsync({
        ...data,
        attachments: uploadedUrls?.length ? uploadedUrls : [],
        status: 'draft',
        publishDate: new Date(data?.publishDate).toISOString(),
      });
      router.push('/');
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handlePublish = async (data: CreateNoticeFormData) => {
    try {
      await createNoticeMutation.mutateAsync({
        ...data,
        attachments: uploadedUrls?.length ? uploadedUrls : [],
        status: 'published',
        publishDate: new Date(data?.publishDate).toISOString(),
      });
      setPublishedNoticeTitle(data.noticeTitle);
      form.reset();
      setFiles([]);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error publishing notice:', error);
    }
  };

  const handleCreateAnother = () => {
    form.reset();
    setFiles([]);
    setShowSuccessDialog(false);
  };

  return (
    <div className="w-full pb-20">
      <CreateNoticeHeader />

      <div className="bg-white rounded-lg border border-[#9096B1]">
        <div className="bg-[#F5F6FA] rounded-t-md p-4 border-[#9096B1] border-b">
          <p className="text-sm text-[#64748B]">Please fill in the details below</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-4 px-5 py-6">
            <TargetDepartmentField form={form} />
            <NoticeTitleField form={form} />
            <EmployeeFields form={form} />

            <div className="grid grid-cols-2 gap-4">
              <NoticeTypeField form={form} />
              <PublishDateField form={form} />
            </div>

            <NoticeBodyField form={form} />

            <FileUpload
              value={files}
              onChange={setFiles}
              onUploadComplete={handleUploadComplete}
              acceptedTypes="jpg, png, pdf"
              autoUpload={false}
            />
          </form>
        </Form>
      </div>

      <FormActions
        onCancel={handleCancel}
        onSaveDraft={() => form.handleSubmit(handleSaveDraft)()}
        onPublish={form.handleSubmit(handlePublish)}
        isLoading={createNoticeMutation.isPending}
      />

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        noticeTitle={publishedNoticeTitle}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
}
