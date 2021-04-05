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
import { createPortfolio } from '../../api/portfolio';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useSortBy, useTable } from 'react-table';

const EnhancedTable: React.FC<EnhancedTableProp> = ({
  columns,
  data,
  setData,
  onDragEnd,
  updateData,
  tickers,
}: EnhancedTableProp) => {
  const { getTableProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      updateData,
      tickers,
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
                selectedRowId={row.index}
              />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const currentUser = useSelector((state: RootState) => state.currentUser);

  const deleteHandler = (index, id) => {
    const newData = [...data].filter((_, i) => ![index].includes(i));
    createPortfolio({
      sheet: newData,
      uid: currentUser.uid,
      token: currentUser.idToken,
    })
      .then((res) => setData(res.data.sheet))
      .catch((err) => {
        alert(err);
      });
  };

  const addHandler = (item) => {
    const newData = data.concat(item);
    createPortfolio({
      sheet: newData,
      uid: currentUser.uid,
      token: currentUser.idToken,
    })
      .then((res) => setData(res.data.sheet))
      .catch((err) => {
        alert(err);
      });
  };

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar addHandler={addHandler} title={'Add'} tickers={tickers} />
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
  tickers: any[];
  setData: Function;
  onDragEnd: Function;
  updateData: Function;
};

export default EnhancedTable;
