import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TickerPage from './components/pages/TickerPage';
import HomePage from './components/pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/tickers" component={TickerPage} exact />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
