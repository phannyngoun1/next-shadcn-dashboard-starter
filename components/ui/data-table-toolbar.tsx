'use client';

import { Table } from '@tanstack/react-table';
import { Input } from './input';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { statuses } from '@/app/dashboard/user/data/data';
import { Button } from './button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableViewOptions } from './data-table-view-options';
import { Plus } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
}

export function DataTableToolbar<TData>({
  table,
  searchKey
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={`Search ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="Status"
            options={statuses}
          />
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
      <div className="flex space-x-2">
        <Button variant={'default'} className="h-8 px-2 lg:px-3">
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
