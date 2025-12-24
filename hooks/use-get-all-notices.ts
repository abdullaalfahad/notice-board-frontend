import api from '@/lib/axios';
import { AllNoticeApiResponse } from '@/types/notice-types';
import { useQuery } from '@tanstack/react-query';

const queryFn = async (status?: string) => {
  const params = new URLSearchParams();
  if (status && status !== 'all') {
    params.append('status', status);
  }
  const response = await api.get<AllNoticeApiResponse>(`/notices?${params.toString()}`);
  return response.data?.data;
};

export const useGetAllNotices = (status?: string) => {
  return useQuery({
    queryKey: ['notices', status],
    queryFn: () => queryFn(status),
  });
};
