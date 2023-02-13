import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { fetchPortfolios } from '../../api/portfolio';
import Loader from '../molecules/Loader';
import GenericTemplate from '../templates/GenericTemplate';
import PortfolioTable from '../organisms/PortfolioTable';
import ErrorPage from './ErrorPage';
import type { PortfolioItem } from '../../typings';

const PortfolioPage: React.FC = () => {
  const user = useSelector(selectUser);
  const [hasError, setHasError] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(null);

  useEffect(() => {
    if (user?.uid) {
      fetchPortfolios({ uid: user.uid, token: user.idToken })
        .then((res) => {
          setPortfolio(res.data.sheet);
        })
        .catch((err: any) => {
          console.log(err);
          setHasError(true);
        });
    }
  }, [user]);

  if (hasError === true) return <ErrorPage />;

  return (
    <GenericTemplate title="Portfolio">
      {portfolio ? <PortfolioTable sheet={portfolio} /> : <Loader />}
    </GenericTemplate>
  );
};

export default PortfolioPage;
