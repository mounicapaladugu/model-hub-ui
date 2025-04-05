import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Models from './pages/Models';
import EdgeNodes from './pages/EdgeNodes';
import Deployments from './pages/Deployments';
import FederatedLearning from './pages/FederatedLearning';
import Monitoring from './pages/Monitoring';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="models" element={<Models />} />
        <Route path="edge-nodes" element={<EdgeNodes />} />
        <Route path="deployments" element={<Deployments />} />
        <Route path="federated-learning" element={<FederatedLearning />} />
        <Route path="monitoring" element={<Monitoring />} />
      </Route>
    </Routes>
  );
}

export default App;
