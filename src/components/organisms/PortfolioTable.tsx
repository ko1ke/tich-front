import { useMemo, useState, useEffect, useCallback } from 'react';
import { fetchTickers } from '../../api/ticker';
import EditableCell from '../atoms/EditableCell';
import TickerSelectableCell from '../atoms/TickerSelectableCell';
import { createPortfolio } from '../../api/portfolio';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Ticker, PortfolioItem } from '../../typings';
import MaUTable from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableToolbar from '../molecules/TableToolbar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TableBody from '@mui/material/TableBody';
import {
  ColumnDef,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
  RowData,
} from '@tanstack/react-table';
import DeleteDialog from '../molecules/DeleteDialog';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    onDragEnd: (result: any) => void;
    tickers: Ticker[];
  }
}

type Props = {
  sheet: PortfolioItem[];
};

const PortfolioTable: React.FC<Props> = ({ sheet }) => {
  const [data, setData] = useState(sheet);
  const [tickers, setTickers] = useState<Ticker[]>([]);
  const currentUser = useSelector((state: RootState) => state.currentUser);
  const columnHelper = createColumnHelper<PortfolioItem>();

  useEffect(() => {
    fetchTickers()
      .then((res) => {
        setTickers(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const deleteHandler = useCallback(
    (index, id) => {
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
    },
    [data, currentUser]
  );

  const addHandler = useCallback(
    (item) => {
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
    },
    [data, currentUser]
  );

  const columns = useMemo<ColumnDef<PortfolioItem>[]>(
    () => [
      {
        id: 'delete',
        cell: ({ row }) => (
          <div className="px-1">
            <div>
              <DeleteDialog
                deleteHandler={deleteHandler}
                selectedRowId={row.index}
              />
            </div>
          </div>
        ),
      },
      columnHelper.accessor('symbol', {
        header: 'Symbol',
        cell: TickerSelectableCell,
      }),
      columnHelper.accessor('targetPrice', {
        header: 'Target Price',
        cell: EditableCell,
      }),
      columnHelper.accessor('price', {
        header: 'Current Price',
        cell: (info) =>
          info.getValue() > info.cell.row.original.targetPrice ? (
            <span style={{ color: 'green' }}>{info.getValue()}👍</span>
          ) : (
            <span style={{ color: 'red' }}>{info.getValue()}</span>
          ),
      }),
      columnHelper.accessor('change', {
        header: 'Change',
        cell: (info) =>
          info.getValue() > 0 ? (
            <span style={{ color: 'green' }}>{info.getValue()}👍</span>
          ) : (
            <span style={{ color: 'red' }}>{info.getValue()}</span>
          ),
      }),
      columnHelper.accessor('note', {
        header: 'Note',
        cell: EditableCell,
      }),
      columnHelper.accessor('symbol', {
        id: 'link-to-chart',
        header: 'Link to Charts',
        cell: (info) => {
          return (
            <a
              href={`https://www.marketwatch.com/investing/stock/${info
                .getValue()
                ?.toLowerCase()}/charts`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {`Click to open MarketWatch`}
            </a>
          );
        },
      }),
    ],
    [columnHelper, deleteHandler]
  );

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1); // Strip String from Array
    result.splice(endIndex, 0, removed);
    return result;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // Provide our updateData function to our table meta
    meta: {
      onDragEnd: (result) => {
        if (!result.destination) {
          return;
        }

        if (result.destination.index === result.source.index) {
          return;
        }

        const newData = reorder(
          data,
          result.source.index,
          result.destination.index
        );
        createPortfolio({
          sheet: newData,
          uid: currentUser.uid,
          token: currentUser.idToken,
        })
          .then((res) => setData(res.data.sheet))
          .catch((err) => {
            alert(err);
          });
      },
      updateData: (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        const newData = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        });
        createPortfolio({
          sheet: newData,
          uid: currentUser.uid,
          token: currentUser.idToken,
        })
          .then((res) => {
            setData(res.data.sheet);
          })
          .catch((err) => {
            alert(err);
          });
      },
      tickers: tickers,
    },
    debugTable: true,
  });

  return (
    <TableContainer>
      <TableToolbar addHandler={addHandler} title={'Add'} tickers={tickers} />
      <MaUTable size="small">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <DragDropContext onDragEnd={table.options.meta?.onDragEnd}>
          <Droppable droppableId="table">
            {(dropProvided) => (
              <TableBody
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {table.getRowModel().rows.map((row, i) => {
                  return (
                    <Draggable
                      key={i}
                      draggableId={`draggable-id-${i}`}
                      index={row.index}
                    >
                      {(dragProvided) => (
                        <TableRow
                          hover
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          {row.getVisibleCells().map((cell, j) => {
                            return (
                              <TableCell key={j}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      )}
                    </Draggable>
                  );
                })}
                {dropProvided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </MaUTable>
    </TableContainer>
  );
};

export default PortfolioTable;
