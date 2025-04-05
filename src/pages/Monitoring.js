import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ServerIcon, 
  CpuChipIcon,
  ClockIcon,
  ArrowPathIcon,
  BellAlertIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// Mock data for monitoring
const systemMetricsMock = {
  cpu: [
    { time: '00:00', value: 23 },
    { time: '01:00', value: 25 },
    { time: '02:00', value: 28 },
    { time: '03:00', value: 32 },
    { time: '04:00', value: 35 },
    { time: '05:00', value: 40 },
    { time: '06:00', value: 45 },
    { time: '07:00', value: 50 },
    { time: '08:00', value: 55 },
    { time: '09:00', value: 60 },
    { time: '10:00', value: 58 },
    { time: '11:00', value: 52 },
    { time: '12:00', value: 48 },
  ],
  memory: [
    { time: '00:00', value: 35 },
    { time: '01:00', value: 38 },
    { time: '02:00', value: 40 },
    { time: '03:00', value: 45 },
    { time: '04:00', value: 48 },
    { time: '05:00', value: 52 },
    { time: '06:00', value: 55 },
    { time: '07:00', value: 58 },
    { time: '08:00', value: 62 },
    { time: '09:00', value: 65 },
    { time: '10:00', value: 68 },
    { time: '11:00', value: 65 },
    { time: '12:00', value: 60 },
  ],
  network: [
    { time: '00:00', value: 10 },
    { time: '01:00', value: 12 },
    { time: '02:00', value: 15 },
    { time: '03:00', value: 18 },
    { time: '04:00', value: 20 },
    { time: '05:00', value: 25 },
    { time: '06:00', value: 30 },
    { time: '07:00', value: 35 },
    { time: '08:00', value: 40 },
    { time: '09:00', value: 45 },
    { time: '10:00', value: 42 },
    { time: '11:00', value: 38 },
    { time: '12:00', value: 35 },
  ]
};

const alertsMock = [
  {
    id: 1,
    severity: 'critical',
    message: 'Edge Node 4 is offline',
    timestamp: '2025-04-03 15:30',
    source: 'Edge Node 4',
    acknowledged: false
  },
  {
    id: 2,
    severity: 'warning',
    message: 'Edge Node 5 battery level below 70%',
    timestamp: '2025-04-04 09:45',
    source: 'Edge Node 5',
    acknowledged: true
  },
  {
    id: 3,
    severity: 'info',
    message: 'Federated learning round completed',
    timestamp: '2025-04-04 12:30',
    source: 'Orchestration Layer',
    acknowledged: true
  },
  {
    id: 4,
    severity: 'warning',
    message: 'High CPU usage on Edge Node 2',
    timestamp: '2025-04-04 14:15',
    source: 'Edge Node 2',
    acknowledged: false
  }
];

const nodeStatusMock = [
  { id: 1, name: 'Edge Node 1', status: 'online', cpu: 23, memory: 45, network: 18 },
  { id: 2, name: 'Edge Node 2', status: 'online', cpu: 78, memory: 52, network: 25 },
  { id: 3, name: 'Edge Node 3', status: 'online', cpu: 18, memory: 37, network: 12 },
  { id: 4, name: 'Edge Node 4', status: 'offline', cpu: 0, memory: 0, network: 0 },
  { id: 5, name: 'Edge Node 5', status: 'maintenance', cpu: 5, memory: 12, network: 3 }
];

function getSeverityColor(severity) {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'info':
      return 'text-blue-600 bg-blue-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

function getStatusColor(status) {
  switch (status) {
    case 'online':
      return 'bg-green-500';
    case 'offline':
      return 'bg-red-500';
    case 'maintenance':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
}

// Simple chart component using div heights to simulate a chart
function SimpleChart({ data, color }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="flex items-end h-24 space-x-1">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className={`w-4 ${color}`} 
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          ></div>
          {index % 3 === 0 && (
            <div className="text-xs text-gray-500 mt-1">{item.time}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Monitoring() {
  const [timeRange, setTimeRange] = useState('12h');
  const [alerts, setAlerts] = useState(alertsMock);
  const [nodeStatus, setNodeStatus] = useState(nodeStatusMock);

  const acknowledgeAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Monitoring</h1>
        <div className="flex space-x-2">
          <select
            id="time-range"
            name="time-range"
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1h">Last 1 hour</option>
            <option value="6h">Last 6 hours</option>
            <option value="12h">Last 12 hours</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <CpuChipIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">CPU Usage</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">48%</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <SimpleChart data={systemMetricsMock.cpu} color="bg-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <ServerIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Memory Usage</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">60%</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <SimpleChart data={systemMetricsMock.memory} color="bg-secondary" />
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Network Traffic</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">35 MB/s</div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <SimpleChart data={systemMetricsMock.network} color="bg-success-light" />
            </div>
          </div>
        </div>
      </div>

      {/* Edge Node Status */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Edge Node Status</h2>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nodeStatus.map((node) => (
                <div key={node.id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${getStatusColor(node.status)} mr-2`}></div>
                    <h3 className="text-lg font-medium text-gray-900">{node.name}</h3>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">CPU</span>
                        <span className="font-medium">{node.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            node.cpu > 70 ? 'bg-red-500' : node.cpu > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${node.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Memory</span>
                        <span className="font-medium">{node.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            node.memory > 70 ? 'bg-red-500' : node.memory > 50 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${node.memory}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Network</span>
                        <span className="font-medium">{node.network} MB/s</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${(node.network / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Alerts</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            {alerts.filter(alert => !alert.acknowledged).length} unacknowledged
          </span>
        </div>
        <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {alerts.map((alert) => (
              <li key={alert.id} className={`px-4 py-4 ${!alert.acknowledged ? 'bg-gray-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                      {alert.severity === 'critical' ? (
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      ) : (
                        <BellAlertIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                      <div className="flex text-sm text-gray-500">
                        <p>{alert.source}</p>
                        <p className="ml-2">
                          <time dateTime={alert.timestamp}>{alert.timestamp}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {!alert.acknowledged && (
                      <button
                        type="button"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* System Health */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">System Health</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <ServerIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Orchestration Layer</dt>
                    <dd>
                      <div className="text-sm font-medium text-green-600">Healthy</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <ChartBarIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Federated Aggregation</dt>
                    <dd>
                      <div className="text-sm font-medium text-green-600">Operational</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                  <ClockIcon className="h-5 w-5 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Edge Connectivity</dt>
                    <dd>
                      <div className="text-sm font-medium text-yellow-600">Degraded (2/5 nodes)</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <CpuChipIcon className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Model Registry</dt>
                    <dd>
                      <div className="text-sm font-medium text-green-600">Healthy</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
