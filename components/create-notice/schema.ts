import { z } from 'zod';

export const createNoticeSchema = z.object({
  targetType: z.enum(['INDIVIDUAL'], {
    required_error: 'Target type is required',
  }),
  noticeTitle: z
    .string()
    .min(1, 'Notice title is required')
    .min(3, 'Notice title must be at least 3 characters'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  employeeName: z
    .string()
    .min(1, 'Employee name is required')
    .min(2, 'Employee name must be at least 2 characters'),
  position: z.string().min(1, 'Position is required'),
  noticeType: z.string().min(1, 'Notice type is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  noticeBody: z.string().min(1, 'Notice body is required'),
  attachments: z.array(z.instanceof(File)).optional(),
});

export type CreateNoticeFormData = z.infer<typeof createNoticeSchema>;
