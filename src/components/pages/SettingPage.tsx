import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericTemplate from '../templates/GenericTemplate';

const SettingPage = () => {
  const history = useHistory();

  return (
    <GenericTemplate title="Setting">
      <>Contents</>
    </GenericTemplate>
  );
};

export default SettingPage;
