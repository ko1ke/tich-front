import React from 'react';

import MaUTable from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableToolbar from './TableToolbar';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteDialog from './DeleteDialog';
import Tbody from './Tbody';
import { useSortBy, useTable } from 'react-table';

const EnhancedTable: React.FC<EnhancedTableProp> = ({
  columns,
  data,
  setData,
  onDragEnd,
  updateData,
}: EnhancedTableProp) => {
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      updateData,
    },
    useSortBy,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          Cell: ({ row }) => (
            <div>
              <DeleteDialog
                deleteHandler={deleteHandler}
                itemOfRow={row.original}
                selectedRowId={row.index}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const deleteHandler = (index, id) => {    
    const newData = data.filter((_, i) => ![index].includes(i));
    setData(newData);
  };

  const addHandler = (item) => {
    const newData = data.concat(item);
    setData(newData);
  };

  // const editHandler = (item, index) => {
  //   const newData = [...data];
  //   newData[index] = item;
  //   setData(newData);
  // };

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar addHandler={addHandler} title={'Add'} />
      <MaUTable size="small" {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps(
                    column.getSortByToggleProps({
                      title: null,
                    })
                  )}
                >
                  {column.render('Header')}
                  <Tooltip title="sort">
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <Tbody rows={rows} prepareRow={prepareRow} onDragEnd={onDragEnd} />
      </MaUTable>
    </TableContainer>
  );
};

type EnhancedTableProp = {
  columns: any[];
  data: any[];
  setData: Function;
  onDragEnd: Function;
  updateData: Function;
};

export default EnhancedTable;
