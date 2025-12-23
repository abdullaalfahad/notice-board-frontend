import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNoticeFormData } from '@/components/create-notice/schema';

interface CreateNoticePayload extends Omit<CreateNoticeFormData, 'attachments'> {
  attachments?: string[];
  status: 'draft' | 'published';
}

const mutationFn = async (data: CreateNoticePayload) => {
  const response = await api.post('/notices', {
    targetType: data.targetType,
    noticeTitle: data.noticeTitle,
    employeeId: data.employeeId,
    employeeName: data.employeeName,
    position: data.position,
    noticeType: data.noticeType,
    publishDate: data.publishDate,
    noticeBody: data.noticeBody || '',
    status: data.status,
    attachments: data.attachments || [],
  });
  return response.data;
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-notice'],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
  });
};

