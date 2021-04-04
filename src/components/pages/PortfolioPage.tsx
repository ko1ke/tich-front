import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { fetchPortfolios } from '../../api/portfolio';
import Loader from '../molecules/Loader';
import GenericTemplate from '../templates/GenericTemplate';
import PortfolioTable from '../organisms/PortfolioTable';

interface Portfolio {
  ticker: string;
  unitPrice: number;
  number: number;
  note: string;
}

const PortfolioPage: React.FC = () => {
  const user = useSelector(selectUser);
  const [portfolio, setPortfolio] = useState<Portfolio[]>(null);

  useEffect(() => {
    if (user?.uid) {
      fetchPortfolios({ uid: user.uid, token: user.idToken })
        .then((res) => {
          setPortfolio(res.data.sheet as Portfolio[]);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [user]);

  return (
    <GenericTemplate title="Portfolio">
      {portfolio ? <PortfolioTable sheet={portfolio} /> : <Loader />}
    </GenericTemplate>
  );
};

export default PortfolioPage;
