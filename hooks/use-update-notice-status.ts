import api from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationFn = async (data: { noticeId: string; status: string }) => {
  const response = await api.patch(`/notices/${data.noticeId}/status`, { status: data.status });
  return response.data;
};

export const useUpdateNoticeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-notice-status'],
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
  });
};
