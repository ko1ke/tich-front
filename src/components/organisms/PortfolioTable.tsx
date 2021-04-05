import React, { useMemo, useState, useEffect } from 'react';
import { fetchTickers } from '../../api/ticker';
import TableContent from '../molecules/TableContent';
import EditableCell from '../atoms/EditableCell';
import TickerSelectableCell from '../atoms/TickerSelectableCell';
import { createPortfolio } from '../../api/portfolio';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Ticker {
  symbol: string;
  formalName: string;
}

const PortfolioTable = ({ sheet }) => {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    fetchTickers()
      .then((res) => {
        setTickers(res.data as Ticker[]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const currentUser = useSelector((state: RootState) => state.currentUser);

  const columns = [
    {
      Header: 'Symbol',
      accessor: 'symbol',
      Cell: TickerSelectableCell,
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
      id: 'link-to-chart',
      Header: 'Link to Charts',
      accessor: 'symbol',
      Cell: ({ cell: { value } }) => {
        return (
          <a
            href={`https://www.marketwatch.com/investing/stock/${value?.toLowerCase()}/charts`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Click to open MarketWatch`}
          </a>
        );
      },
    },
    {
      Header: 'Note',
      accessor: 'note',
      Cell: EditableCell,
    },
  ];

  const [data, setData] = useState(sheet);
  const memorized = useMemo(() => ({ columns, data }), [data]);

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
  };

  return (
    <TableContent
      columns={memorized.columns}
      data={memorized.data}
      setData={setData}
      onDragEnd={onDragEnd}
      updateData={updateData}
      tickers={tickers}
    />
  );
};

export default PortfolioTable;
