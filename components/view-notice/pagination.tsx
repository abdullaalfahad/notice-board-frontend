import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export const NoticePagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <Button variant="outline" className="bg-transparent border-0">
        <ArrowLeft />
      </Button>
      <Button className="px-3.5 border border-border rounded bg-transparent border-[#3B82F6] text-[#3B82F6]">
        1
      </Button>
      <Button className="px-3.5 rounded bg-transparent text-[#595F7A]">2</Button>
      <Button className="px-3.5 rounded bg-transparent text-[#595F7A]">3</Button>
      <Button className="px-3.5 rounded bg-transparent text-[#595F7A]">4</Button>
      <Button className="px-3.5 rounded bg-transparent text-[#595F7A]">5</Button>
      <Button variant="outline" className="bg-transparent border-0">
        <ArrowRight />
      </Button>
    </div>
  );
};
