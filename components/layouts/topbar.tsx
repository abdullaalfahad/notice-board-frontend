import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Bell } from 'lucide-react';

export function Topbar() {
  const currentDate = new Date();

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-8">
      <div>
        <h2 className="text-base font-medium text-foreground">{getGreeting()} Asif</h2>
        <p className="text-sm text-[#64748B]">{format(currentDate, 'dd MMMM, yyyy')}</p>
      </div>

      <div className="flex items-center gap-2 justify-center">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-3 top-2.5 size-[5px] rounded-full bg-primary" />
        </Button>

        <div className="w-[1px] h-4 bg-[#8C92AF] mr-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Asif Riaj</p>
            <p className="text-xs text-muted-foreground">Hr</p>
          </div>
          <Avatar>
            <AvatarImage src="/logged-in-user.png" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
