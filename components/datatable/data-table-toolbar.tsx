'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterList?: {
    name: string;
    field: string;
    values: { value: string; label: string }[];
  }[];
  searchColumn?: string;
}

export function DataTableToolbar<TData>({
  table,
  filterList,
  searchColumn,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchColumn && (
          <Input
            placeholder={`Search ${
              searchColumn.charAt(0).toUpperCase() + searchColumn.slice(1)
            } ...`}
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}
        {filterList &&
          filterList.map(
            element =>
              table.getColumn(element.field) && (
                <DataTableFacetedFilter
                  key={element.field}
                  column={table.getColumn(element.field)}
                  title={element.name}
                  options={element.values}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
