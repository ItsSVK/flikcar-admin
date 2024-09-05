'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Auction } from '../../../lib/schema';
import { DataTableColumnHeader } from '../../../components/datatable/data-table-column-header';
import { DataTableRowActions } from '../../../components/datatable/data-table-row-actions';
import { models } from '@/app/firebase/models';
import { ImagePopup } from '@/components/image-popup';

export const columns: ColumnDef<Auction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue('id')}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);

      if (rowValue) {
        const isMatch = rowValue
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
        return isMatch;
      } else {
        return false;
      }
    },
  },
  {
    accessorKey: 'Brand Model Varient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand Model Varient" />
    ),
    cell: ({ row }) => {
      const carDetails: any = row.original.carDetails;
      return (
        <div className="flex items-center">
          <span>
            {carDetails.brand +
              ' ' +
              carDetails.model +
              ' ' +
              carDetails.variant}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (rowValue) {
        const isMatch = rowValue
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
        return isMatch;
      } else {
        return false;
      }
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const brandA = rowA.original.carDetails?.brand || '';
      const brandB = rowB.original.carDetails?.brand || '';
      return brandA.localeCompare(brandB);
    },
  },
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => {
      const imagePath = row.original.carDetails?.imagePath;
      return <ImagePopup src={imagePath} />;
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: 'KMs Driven',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="KMs Driven" />
    ),
    cell: ({ row }) => {
      const kmsDriven = row.original.carDetails?.kmsDriven;
      return <span>{kmsDriven}</span>;
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (rowValue) {
        const isMatch = rowValue
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
        return isMatch;
      } else {
        return false;
      }
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const kmsDrivenA = rowA.original.carDetails?.kmsDriven || 0;
      const kmsDrivenB = rowB.original.carDetails?.kmsDriven || 0;
      return kmsDrivenA - kmsDrivenB;
    },
  },
  {
    accessorKey: 'Reg Year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reg Year" />
    ),
    cell: ({ row }) => <span>{row.original.carDetails?.registrationYear}</span>,
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      if (rowValue) {
        const isMatch = rowValue
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
        return isMatch;
      } else {
        return false;
      }
    },
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const regYearA = rowA.original.carDetails?.registrationYear || 0;
      const regYearB = rowB.original.carDetails?.registrationYear || 0;
      return regYearA - regYearB;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions row={row.original} model={models.auction} />
    ),
  },
];
