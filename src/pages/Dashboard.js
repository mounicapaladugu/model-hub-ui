import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, ServerIcon, CpuChipIcon, CloudArrowDownIcon } from '@heroicons/react/24/outline';

// Mock data for the dashboard
const stats = [
  { id: 1, name: 'Active Edge Nodes', stat: '3/5', icon: ServerIcon, change: '1 increase', changeType: 'increase' },
  { id: 2, name: 'Deployed Models', stat: '2', icon: CpuChipIcon, change: 'No change', changeType: 'neutral' },
  { id: 3, name: 'Pending Deployments', stat: '1', icon: CloudArrowDownIcon, change: '1 decrease', changeType: 'decrease' },
];

const recentActivity = [
  { id: 1, event: 'Model "turbine-anomaly-v2" deployed to Edge Node 1', time: '2 hours ago' },
  { id: 2, event: 'Federated learning round completed', time: '5 hours ago' },
  { id: 3, event: 'Edge Node 3 came online', time: '1 day ago' },
  { id: 4, event: 'Model "power-prediction-v1" rolled back on Edge Node 2', time: '2 days ago' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <div className="flex items-center text-sm text-gray-500">
                  {item.changeType === 'increase' ? (
                    <ArrowUpIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                  ) : item.changeType === 'decrease' ? (
                    <ArrowDownIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" aria-hidden="true" />
                  ) : null}
                  <span className={classNames(
                    item.changeType === 'increase' ? 'text-green-600' : 
                    item.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'
                  )}>
                    {item.change}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary truncate">{activity.event}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* System status */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">System Status</h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Orchestration Layer</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>All services operational</p>
              </div>
              <div className="mt-3 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Healthy
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Federated Aggregation</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Last aggregation: 5 hours ago</p>
              </div>
              <div className="mt-3 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
