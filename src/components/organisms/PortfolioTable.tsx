import React, { useMemo, useState } from 'react';
import TableContent from '../molecules/TableContent';
import EditableCell from '../atoms/EditableCell';
import SaveButton from '../atoms/SaveButton';
import { createPortfolio } from '../../api/portfolio';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PortfolioTable = ({ sheet }) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const columns = useMemo(
    () => [
      {
        Header: 'Ticker',
        accessor: 'ticker',
        Cell: EditableCell,
      },
      {
        Header: 'Target Price',
        accessor: 'targetPrice',
        Cell: EditableCell,
      },
      {
        Header: 'Current price',
        accessor: 'price',
      },
      {
        Header: 'Change',
        accessor: 'change',
      },
      {
        Header: 'Note',
        accessor: 'note',
        Cell: EditableCell,
      },
    ],
    // eslint-disable-next-line
    []
  );

  const [data, setData] = useState(
    useMemo(
      () => sheet,
      // eslint-disable-next-line
      []
    )
  );

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1); // Strip String from Array
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);
    setData(items);
  };

  const updateData = (rowIndex, columnId, value) => {
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
    setData(newData);
  };

  const savePortfolio = () => {
    createPortfolio({
      sheet: data,
      uid: currentUser.uid,
      token: currentUser.idToken,
    })
      .then((res) => setData(res.data.sheet))
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <TableContent
        columns={columns}
        data={data}
        setData={setData}
        onDragEnd={onDragEnd}
        updateData={updateData}
      />
      <SaveButton buttonText={'Save'} saveFunc={savePortfolio} />
    </>
  );
};

export default PortfolioTable;
