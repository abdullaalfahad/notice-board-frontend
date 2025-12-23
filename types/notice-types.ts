export interface Notice {
  _id: string;
  targetType: string;
  noticeTitle: string;
  employeeId?: string;
  employeeName?: string;
  position?: string;
  noticeType: string;
  publishDate: string;
  noticeBody: string;
  attachments: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllNoticeApiResponse {
  success: boolean;
  data: Notice[];
}
