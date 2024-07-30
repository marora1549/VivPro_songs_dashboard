import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import Dashboard from './components/Dashboard';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4423CB',
          colorSecondary: '#07C66C',
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;