import api from '@/lib/axios';
import { AllNoticeApiResponse } from '@/types/notice-types';
import { useQuery } from '@tanstack/react-query';

const queryFn = async () => {
  const response = await api.get<AllNoticeApiResponse>('/notices');
  return response.data?.data;
};

export const useGetAllNotices = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: queryFn,
  });
};
