'use client';

import { FileText } from 'lucide-react';

export function NoticeNoData() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-12">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No notices found</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          There are no notices available at the moment. Create a new notice to get started.
        </p>
      </div>
    </div>
  );
}

