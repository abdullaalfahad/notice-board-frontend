import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: async (publicId: string) => {
      const id = publicId.split('/').pop() || publicId;
      const response = await api.delete(`/uploads/delete/${id}`);
      return response.data;
    },
  });
};
