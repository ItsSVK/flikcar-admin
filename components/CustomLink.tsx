'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface CustomLinkProps {
  href: string;
  label: string;
  view: 'mobile' | 'desktop';
  Component: React.ComponentType<any>;
}

export function CustomLink({ href, label, view, Component }: CustomLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`
                    flex items-center px-3 py-2 
                    ${
                      view == 'desktop'
                        ? 'rounded-lg gap-3 hover:text-primary'
                        : 'rounded-xl gap-4 hover:text-foreground mx-[-0.65rem]'
                    }
                    ${
                      pathname === href
                        ? 'bg-muted text-primary'
                        : 'text-muted-foreground'
                    }
                    `}
    >
      <Component className={`${view == 'desktop' ? 'h-4 w-4' : 'h-5 w-5'}`} />
      {label}
    </Link>
  );
}
