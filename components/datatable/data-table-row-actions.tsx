'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { usePathname } from 'next/navigation';
import React from 'react';
import { Dialog, DialogTrigger } from '../ui/dialog';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import DeleteDialogPopup from '../page/DeleteDialogPopup';
// import { ColorDialogPopup } from '@/app/(app)/colors/ColorDialogPopup';
// import { RTODialogPopup } from '@/app/(app)/rtos/RTODialogPopup';
import Link from 'next/link';
interface DataTableRowActionsProps {
  row: any;
  model: string;
}

export function DataTableRowActions({ row, model }: DataTableRowActionsProps) {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {(model === 'users' || model === 'admins') && (
          <Link href={pathname + '/' + row.id}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
        )}
        {/* {model === 'colors' && <ColorDialogPopup data={row} />}
        {model === 'rtoLocations' && <RTODialogPopup data={row} />} */}
        <DropdownMenuSeparator />
        <DeleteDialogPopup rowid={row.id} model={model} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
