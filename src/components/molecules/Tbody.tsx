import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const TBody = ({ rows, prepareRow, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="table">
        {(dropProvided) => (
          <TableBody
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <Draggable
                  key={i}
                  draggableId={`draggable-id-${i}`}
                  index={row.index}
                >
                  {(dragProvided) => (
                    <TableRow
                      hover
                      {...row.getRowProps()}
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                    >
                      {row.cells.map((cell, j) => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
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
  );
};

export default TBody;
