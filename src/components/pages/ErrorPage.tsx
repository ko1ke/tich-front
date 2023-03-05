import React from 'react';
import Alert from '@mui/material/Alert';
import GenericTemplate from '../templates/GenericTemplate';

const ErrorPage: React.FC = () => {
  return (
    <GenericTemplate title="Error">
      <Alert variant="filled" severity="error">
        Please reload. If errors occur again, the app might go wrong.
      </Alert>
    </GenericTemplate>
  );
};

export default ErrorPage;
