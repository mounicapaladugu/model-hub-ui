import React, { useState } from 'react';
import { 
  ServerIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationCircleIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ComputerDesktopIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

// Mock data for edge nodes
const edgeNodesMock = [
  { 
    id: 1, 
    name: 'Edge Node 1', 
    status: 'online',
    type: 'Offshore Turbine',
    location: 'North Sea Grid A-7',
    lastSeen: '2 minutes ago',
    deployedModels: [
      { id: 1, name: 'turbine-anomaly-v2', status: 'running', lastUpdated: '2025-04-01' }
    ],
    resources: {
      cpu: '23%',
      memory: '45%',
      storage: '32%',
      battery: '87%'
    },
    connectivity: 'Stable',
    version: '1.2.5'
  },
  { 
    id: 2, 
    name: 'Edge Node 2', 
    status: 'online',
    type: 'Offshore Turbine',
    location: 'North Sea Grid B-3',
    lastSeen: '5 minutes ago',
    deployedModels: [
      { id: 2, name: 'power-prediction-v1', status: 'running', lastUpdated: '2025-03-20' }
    ],
    resources: {
      cpu: '31%',
      memory: '52%',
      storage: '28%',
      battery: '72%'
    },
    connectivity: 'Stable',
    version: '1.2.5'
  },
  { 
    id: 3, 
    name: 'Edge Node 3', 
    status: 'online',
    type: 'Offshore Turbine',
    location: 'North Sea Grid C-9',
    lastSeen: '10 minutes ago',
    deployedModels: [
      { id: 1, name: 'turbine-anomaly-v2', status: 'running', lastUpdated: '2025-04-02' }
    ],
    resources: {
      cpu: '18%',
      memory: '37%',
      storage: '45%',
      battery: '91%'
    },
    connectivity: 'Stable',
    version: '1.2.5'
  },
  { 
    id: 4, 
    name: 'Edge Node 4', 
    status: 'offline',
    type: 'Offshore Turbine',
    location: 'North Sea Grid D-2',
    lastSeen: '2 days ago',
    deployedModels: [],
    resources: {
      cpu: '0%',
      memory: '0%',
      storage: '25%',
      battery: '12%'
    },
    connectivity: 'Disconnected',
    version: '1.2.4'
  },
  { 
    id: 5, 
    name: 'Edge Node 5', 
    status: 'maintenance',
    type: 'Offshore Turbine',
    location: 'North Sea Grid A-3',
    lastSeen: '6 hours ago',
    deployedModels: [],
    resources: {
      cpu: '5%',
      memory: '12%',
      storage: '30%',
      battery: '65%'
    },
    connectivity: 'Limited',
    version: '1.2.3'
  }
];

function getStatusIcon(status) {
  switch (status) {
    case 'online':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />;
    case 'offline':
      return <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />;
    case 'maintenance':
      return <ExclamationCircleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />;
    default:
      return <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />;
  }
}

function getStatusClass(status) {
  switch (status) {
    case 'online':
      return 'bg-green-100 text-green-800';
    case 'offline':
      return 'bg-red-100 text-red-800';
    case 'maintenance':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function EdgeNodes() {
  const [edgeNodes, setEdgeNodes] = useState(edgeNodesMock);
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  const filteredNodes = filterStatus === 'all' 
    ? edgeNodes 
    : edgeNodes.filter(node => node.status === filterStatus);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Edge Nodes</h1>
        <div className="flex space-x-2">
          <select
            id="status-filter"
            name="status-filter"
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {/* Edge Nodes summary */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Online Nodes</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {edgeNodes.filter(node => node.status === 'online').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Offline Nodes</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {edgeNodes.filter(node => node.status === 'offline').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Maintenance Nodes</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {edgeNodes.filter(node => node.status === 'maintenance').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edge Nodes list */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredNodes.map((node) => (
            <li key={node.id}>
              <div 
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedNode?.id === node.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleNodeSelect(node)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ServerIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-primary">{node.name}</div>
                      <div className="text-sm text-gray-500">{node.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(node.status)}`}>
                      {node.status.charAt(0).toUpperCase() + node.status.slice(1)}
                    </div>
                    <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <ComputerDesktopIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      {node.type}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Last seen <time dateTime={node.lastSeen}>{node.lastSeen}</time>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Node details */}
      {selectedNode && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edge Node Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {selectedNode.name} - {selectedNode.location}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Restart
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  {getStatusIcon(selectedNode.status)}
                  <span className="ml-2 capitalize">{selectedNode.status}</span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedNode.type}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedNode.location}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Seen</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedNode.lastSeen}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Connectivity</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedNode.connectivity}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Version</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedNode.version}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Resources</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">CPU Usage</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: selectedNode.resources.cpu }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">{selectedNode.resources.cpu}</p>
                    </div>
                    <div>
                      <p className="font-medium">Memory Usage</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: selectedNode.resources.memory }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">{selectedNode.resources.memory}</p>
                    </div>
                    <div>
                      <p className="font-medium">Storage Usage</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: selectedNode.resources.storage }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">{selectedNode.resources.storage}</p>
                    </div>
                    <div>
                      <p className="font-medium">Battery Level</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className={`h-2.5 rounded-full ${
                            parseInt(selectedNode.resources.battery) > 70 
                              ? 'bg-green-500' 
                              : parseInt(selectedNode.resources.battery) > 30 
                                ? 'bg-yellow-500' 
                                : 'bg-red-500'
                          }`}
                          style={{ width: selectedNode.resources.battery }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1">{selectedNode.resources.battery}</p>
                    </div>
                  </div>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deployed Models</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedNode.deployedModels.length > 0 ? (
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {selectedNode.deployedModels.map((model) => (
                        <li key={model.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <span className="ml-2 flex-1 w-0 truncate">{model.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex items-center">
                            <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                              {model.status}
                            </div>
                            <span className="ml-2 text-gray-500">Updated {model.lastUpdated}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No models deployed</p>
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Actions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Deploy Model
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      View Logs
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Remote Access
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
