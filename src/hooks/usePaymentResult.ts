import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { rankUpUser } from '../api/user';
import { useLocation } from 'react-router-dom';

const usePaymentResult = () => {
  const location = useLocation();
  const [paymentResult, setPaymentResult] = useState(undefined);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (location.search === '?success=true') {
      setPaymentResult('succeeded');
      if (user.isAuthenticated) {
        rankUpUser({ uid: user.uid, token: user.idToken }).catch((err) =>
          console.log(err)
        );
      }
    }
    if (location.search === '?canceled=true') {
      setPaymentResult('canceled');
    }
    if (location.search === '') {
      setPaymentResult('');
    }
  }, [location, user]);

  return { paymentResult };
};

export default usePaymentResult;
