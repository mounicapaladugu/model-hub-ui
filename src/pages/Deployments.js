import React, { useState } from 'react';
import { 
  CloudArrowDownIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  ArrowPathIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// Mock data for deployments
const deploymentsMock = [
  { 
    id: 1, 
    modelName: 'turbine-anomaly-v2', 
    targetNodes: ['Edge Node 1', 'Edge Node 3'],
    status: 'completed',
    deployedAt: '2025-04-01 14:30',
    completedAt: '2025-04-01 14:35',
    initiatedBy: 'admin@example.com',
    version: 'v2.1.0',
    logs: [
      { time: '14:30:05', message: 'Deployment initiated' },
      { time: '14:31:12', message: 'Transferring model to Edge Node 1' },
      { time: '14:32:45', message: 'Model deployed to Edge Node 1' },
      { time: '14:33:20', message: 'Transferring model to Edge Node 3' },
      { time: '14:34:55', message: 'Model deployed to Edge Node 3' },
      { time: '14:35:00', message: 'Deployment completed successfully' }
    ]
  },
  { 
    id: 2, 
    modelName: 'power-prediction-v1', 
    targetNodes: ['Edge Node 2'],
    status: 'completed',
    deployedAt: '2025-03-20 09:15',
    completedAt: '2025-03-20 09:18',
    initiatedBy: 'admin@example.com',
    version: 'v1.0.0',
    logs: [
      { time: '09:15:10', message: 'Deployment initiated' },
      { time: '09:16:30', message: 'Transferring model to Edge Node 2' },
      { time: '09:17:45', message: 'Model deployed to Edge Node 2' },
      { time: '09:18:00', message: 'Deployment completed successfully' }
    ]
  },
  { 
    id: 3, 
    modelName: 'maintenance-scheduler-v1', 
    targetNodes: ['Edge Node 4'],
    status: 'failed',
    deployedAt: '2025-03-25 11:20',
    completedAt: '2025-03-25 11:22',
    initiatedBy: 'admin@example.com',
    version: 'v1.0.0',
    logs: [
      { time: '11:20:05', message: 'Deployment initiated' },
      { time: '11:21:12', message: 'Transferring model to Edge Node 4' },
      { time: '11:22:00', message: 'Deployment failed: Edge Node 4 is offline' }
    ]
  },
  { 
    id: 4, 
    modelName: 'turbine-anomaly-v3', 
    targetNodes: ['Edge Node 1', 'Edge Node 2', 'Edge Node 3'],
    status: 'in-progress',
    deployedAt: '2025-04-04 20:45',
    completedAt: null,
    initiatedBy: 'admin@example.com',
    version: 'v3.0.0',
    logs: [
      { time: '20:45:05', message: 'Deployment initiated' },
      { time: '20:46:12', message: 'Transferring model to Edge Node 1' },
      { time: '20:47:45', message: 'Model deployed to Edge Node 1' },
      { time: '20:48:20', message: 'Transferring model to Edge Node 2' },
      { time: '20:49:55', message: 'Model deployed to Edge Node 2' },
      { time: '20:50:20', message: 'Transferring model to Edge Node 3...' }
    ]
  }
];

function getStatusIcon(status) {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />;
    case 'in-progress':
      return <ClockIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />;
    case 'failed':
      return <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />;
    default:
      return null;
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function Deployments() {
  const [deployments, setDeployments] = useState(deploymentsMock);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [showNewDeploymentModal, setShowNewDeploymentModal] = useState(false);

  const handleDeploymentSelect = (deployment) => {
    setSelectedDeployment(deployment);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Deployments</h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowNewDeploymentModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Deployment
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {/* Deployments list */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {deployments.map((deployment) => (
            <li key={deployment.id}>
              <div 
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedDeployment?.id === deployment.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleDeploymentSelect(deployment)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CloudArrowDownIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-primary">{deployment.modelName}</div>
                      <div className="text-sm text-gray-500">
                        Deployed to: {deployment.targetNodes.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(deployment.status)}`}>
                      {deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)}
                    </div>
                    {getStatusIcon(deployment.status)}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Version: {deployment.version}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Deployed at: {deployment.deployedAt}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Deployment details */}
      {selectedDeployment && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Deployment Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {selectedDeployment.modelName} - Version {selectedDeployment.version}
              </p>
            </div>
            <div className="flex space-x-2">
              {selectedDeployment.status === 'failed' && (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Retry
                </button>
              )}
              {selectedDeployment.status === 'completed' && (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Rollback
                </button>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  {getStatusIcon(selectedDeployment.status)}
                  <span className="ml-2 capitalize">{selectedDeployment.status}</span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedDeployment.modelName}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Version</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedDeployment.version}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Target Nodes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedDeployment.targetNodes.join(', ')}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Initiated By</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedDeployment.initiatedBy}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deployment Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Started: {selectedDeployment.deployedAt}
                  <br />
                  {selectedDeployment.completedAt && `Completed: ${selectedDeployment.completedAt}`}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deployment Logs</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="bg-black rounded-md p-4 text-white font-mono text-xs overflow-auto max-h-60">
                    {selectedDeployment.logs.map((log, index) => (
                      <div key={index} className="py-1">
                        <span className="text-gray-400">[{log.time}]</span> {log.message}
                      </div>
                    ))}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* New Deployment Modal */}
      {showNewDeploymentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewDeploymentModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-light">
                  <CloudArrowDownIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    New Deployment
                  </h3>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="mb-4">
                  <label htmlFor="model-select" className="block text-sm font-medium text-gray-700">
                    Select Model
                  </label>
                  <select
                    id="model-select"
                    name="model-select"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>turbine-anomaly-v2</option>
                    <option>power-prediction-v1</option>
                    <option>maintenance-scheduler-v1</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="version-select" className="block text-sm font-medium text-gray-700">
                    Version
                  </label>
                  <select
                    id="version-select"
                    name="version-select"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>v2.1.0</option>
                    <option>v2.0.0</option>
                    <option>v1.0.0</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Edge Nodes
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="node-1"
                        name="node-1"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="node-1" className="ml-2 block text-sm text-gray-900">
                        Edge Node 1
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="node-2"
                        name="node-2"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="node-2" className="ml-2 block text-sm text-gray-900">
                        Edge Node 2
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="node-3"
                        name="node-3"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="node-3" className="ml-2 block text-sm text-gray-900">
                        Edge Node 3
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="node-4"
                        name="node-4"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        disabled
                      />
                      <label htmlFor="node-4" className="ml-2 block text-sm text-gray-400">
                        Edge Node 4 (Offline)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="node-5"
                        name="node-5"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        disabled
                      />
                      <label htmlFor="node-5" className="ml-2 block text-sm text-gray-400">
                        Edge Node 5 (Maintenance)
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Deployment Options
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="rollback-on-failure"
                        name="rollback-on-failure"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="rollback-on-failure" className="ml-2 block text-sm text-gray-900">
                        Rollback on failure
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="validate-deployment"
                        name="validate-deployment"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="validate-deployment" className="ml-2 block text-sm text-gray-900">
                        Validate deployment
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => setShowNewDeploymentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => {
                      // In a real app, we would handle the deployment here
                      setShowNewDeploymentModal(false);
                    }}
                  >
                    Deploy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
