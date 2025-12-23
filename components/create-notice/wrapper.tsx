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

  const handleSaveDraft = async (data: CreateNoticeFormData) => {
    try {
      await createNoticeMutation.mutateAsync({
        ...data,
        attachments: [],
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
        attachments: [],
        status: 'published',
        publishDate: new Date(data?.publishDate).toISOString(),
      });
      setPublishedNoticeTitle(data.noticeTitle);
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
    <div className="w-full">
      <CreateNoticeHeader />

      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <div className="bg-[#F5F6FA] rounded-md p-4 mb-6">
          <p className="text-sm text-[#64748B]">Please fill in the details below</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-4">
            <TargetDepartmentField form={form} />
            <NoticeTitleField form={form} />
            <EmployeeFields form={form} />

            {/* Notice Type and Publish Date - Same Row */}
            <div className="grid grid-cols-2 gap-4">
              <NoticeTypeField form={form} />
              <PublishDateField form={form} />
            </div>

            <NoticeBodyField form={form} />

            <FileUpload
              value={files}
              onChange={(newFiles) => {
                setFiles(newFiles);
                form.setValue('attachments', newFiles);
              }}
              acceptedTypes="jpg, png, pdf"
            />

            <FormActions
              onCancel={handleCancel}
              onSaveDraft={() => form.handleSubmit(handleSaveDraft)()}
              onPublish={form.handleSubmit(handlePublish)}
              isLoading={createNoticeMutation.isPending}
            />
          </form>
        </Form>
      </div>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        noticeTitle={publishedNoticeTitle}
        onCreateAnother={handleCreateAnother}
      />
    </div>
  );
}
