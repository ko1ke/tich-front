import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import { Redirect } from 'react-router-dom';
import usePaymentResult from '../../hooks/usePaymentResult';

const PaymentPage: React.FC = () => {
  const { paymentResult } = usePaymentResult();

  if (paymentResult === '') return <Redirect to="/" />;

  return (
    <GenericTemplate title={`Payment ${paymentResult}`}>
      <>{`The payment ${paymentResult}.`}</>
    </GenericTemplate>
  );
};

export default PaymentPage;
