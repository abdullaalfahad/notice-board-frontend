'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  FileStack,
  FileText,
  Folder,
  LayoutGrid,
  ListTodo,
  LogOut,
  Newspaper,
  Package,
  UserCheck,
  UserCircle,
  Users,
  UsersRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    href: '/dashboard',
  },
  {
    title: 'Employee',
    icon: Users,
    href: '/employee',
    children: [
      { title: 'Employee Database', icon: Users, href: '/employee/database' },
      { title: 'Add New Employee', icon: Users, href: '/employee/add' },
      { title: 'Performance Report', icon: Users, href: '/employee/performance' },
      { title: 'Performance History', icon: Users, href: '/employee/history' },
    ],
  },
  {
    title: 'Payroll',
    icon: Package,
    href: '/payroll',
  },
  {
    title: 'Pay Slip',
    icon: FileText,
    href: '/pay-slip',
  },
  {
    title: 'Attendance',
    icon: UserCheck,
    href: '/attendance',
  },
  {
    title: 'Request Center',
    icon: Folder,
    href: '/request-center',
  },
  {
    title: 'Career Database',
    icon: UsersRound,
    href: '/career-database',
  },
  {
    title: 'Document manager',
    icon: FileStack,
    href: '/document-manager',
  },
  {
    title: 'Notice Board',
    icon: Newspaper,
    href: '/',
  },
  {
    title: 'Activity Log',
    icon: ListTodo,
    href: '/activity-log',
  },
  {
    title: 'Exit Interview',
    icon: LogOut,
    href: '/exit-interview',
  },
  {
    title: 'Profile',
    icon: UserCircle,
    href: '/profile',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['Employee']);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => href === '/';
  const isParentActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some((child) => pathname === child.href);
    }
    return false;
  };

  return (
    <div className="flex h-screen w-[250px] flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-8 pt-8 justify-center">
        <Link href="/">
          <Image
            src="/nebsit-logo.png"
            alt="Nebs-IT Logo"
            width={200}
            height={200}
            className="object-contain size-40"
          />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-6 py-8">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <Button
                    variant="ghost"
                    className={cn(
                      'relative w-full bg-[#F5F6FA] justify-start rounded-md rounded-b-0 border-b border-border gap-3 px-3 py-2 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      isParentActive(item) && 'text-foreground'
                    )}
                    onClick={() => toggleExpand(item.title)}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {expandedItems.includes(item.title) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {expandedItems.includes(item.title) && (
                    <ul className="-mt-1 pl-6 space-y-1 pt-2 bg-[#F5F6FA] border-l border-border border-[#CBD5E1] border-r border-b rounded-br-md rounded-bl-md">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.href}
                            className={cn(
                              'block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                              isActive(child.href) && 'text-foreground'
                            )}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 px-3 py-2 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                      isActive(item.href) &&
                        'text-foreground bg-[#F5F6FA] border-r-1 border-[#FF3E01]'
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.title}</span>
                  </Button>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
