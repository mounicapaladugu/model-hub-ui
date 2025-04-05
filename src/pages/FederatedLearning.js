import React, { useState } from 'react';
import { 
  ArrowPathIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  PlusIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

// Mock data for federated learning jobs
const federatedJobsMock = [
  { 
    id: 1, 
    name: 'Turbine Anomaly Detection Improvement', 
    baseModel: 'turbine-anomaly-v2',
    status: 'completed',
    participatingNodes: ['Edge Node 1', 'Edge Node 2', 'Edge Node 3'],
    startedAt: '2025-04-01 10:00',
    completedAt: '2025-04-01 12:30',
    rounds: 5,
    improvement: '+2.3%',
    newModelName: 'turbine-anomaly-v3',
    privacySettings: {
      differentialPrivacy: true,
      epsilon: 0.5,
      secureAggregation: true
    },
    metrics: {
      initialAccuracy: '94.2%',
      finalAccuracy: '96.5%',
      dataPointsProcessed: '15,420',
      convergenceRate: 'High'
    }
  },
  { 
    id: 2, 
    name: 'Power Prediction Refinement', 
    baseModel: 'power-prediction-v1',
    status: 'in-progress',
    participatingNodes: ['Edge Node 1', 'Edge Node 2'],
    startedAt: '2025-04-04 09:15',
    completedAt: null,
    rounds: 3,
    improvement: '+1.2%',
    newModelName: null,
    privacySettings: {
      differentialPrivacy: true,
      epsilon: 0.8,
      secureAggregation: true
    },
    metrics: {
      initialAccuracy: '91.5%',
      finalAccuracy: '92.7%',
      dataPointsProcessed: '8,750',
      convergenceRate: 'Medium'
    }
  },
  { 
    id: 3, 
    name: 'Maintenance Scheduler Training', 
    baseModel: 'maintenance-scheduler-v1',
    status: 'failed',
    participatingNodes: ['Edge Node 3'],
    startedAt: '2025-03-28 14:00',
    completedAt: '2025-03-28 14:15',
    rounds: 1,
    improvement: '0%',
    newModelName: null,
    privacySettings: {
      differentialPrivacy: true,
      epsilon: 0.3,
      secureAggregation: true
    },
    metrics: {
      initialAccuracy: '89.8%',
      finalAccuracy: '89.8%',
      dataPointsProcessed: '320',
      convergenceRate: 'Low'
    }
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

export default function FederatedLearning() {
  const [federatedJobs, setFederatedJobs] = useState(federatedJobsMock);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showNewJobModal, setShowNewJobModal] = useState(false);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Federated Learning</h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowNewJobModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            New Training Job
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

      {/* Federated Learning Jobs list */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {federatedJobs.map((job) => (
            <li key={job.id}>
              <div 
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedJob?.id === job.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleJobSelect(job)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ArrowPathIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-primary">{job.name}</div>
                      <div className="text-sm text-gray-500">
                        Base model: {job.baseModel}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </div>
                    {getStatusIcon(job.status)}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Nodes: {job.participatingNodes.length}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <p>Rounds: {job.rounds}</p>
                    </div>
                    {job.improvement !== '0%' && (
                      <div className="mt-2 flex items-center text-sm text-green-500 sm:mt-0 sm:ml-6">
                        <p>Improvement: {job.improvement}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Started: {job.startedAt}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Job details */}
      {selectedJob && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Training Job Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {selectedJob.name}
              </p>
            </div>
            <div className="flex space-x-2">
              {selectedJob.status === 'in-progress' && (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Stop
                </button>
              )}
              {selectedJob.status === 'completed' && (
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Deploy New Model
                </button>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
                  {getStatusIcon(selectedJob.status)}
                  <span className="ml-2 capitalize">{selectedJob.status}</span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Base Model</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedJob.baseModel}</dd>
              </div>
              {selectedJob.newModelName && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">New Model</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedJob.newModelName}</dd>
                </div>
              )}
              <div className={`${selectedJob.newModelName ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Participating Nodes</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedJob.participatingNodes.join(', ')}
                </dd>
              </div>
              <div className={`${selectedJob.newModelName ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Training Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Started: {selectedJob.startedAt}
                  <br />
                  {selectedJob.completedAt && `Completed: ${selectedJob.completedAt}`}
                </dd>
              </div>
              <div className={`${selectedJob.newModelName ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Rounds</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedJob.rounds}</dd>
              </div>
              <div className={`${selectedJob.newModelName ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Privacy Settings</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>Differential Privacy: {selectedJob.privacySettings.differentialPrivacy ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    {selectedJob.privacySettings.differentialPrivacy && (
                      <div className="flex items-center ml-7">
                        <span>Epsilon: {selectedJob.privacySettings.epsilon}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>Secure Aggregation: {selectedJob.privacySettings.secureAggregation ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </dd>
              </div>
              <div className={`${selectedJob.newModelName ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Performance Metrics</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Initial Accuracy</p>
                      <p>{selectedJob.metrics.initialAccuracy}</p>
                    </div>
                    <div>
                      <p className="font-medium">Final Accuracy</p>
                      <p>{selectedJob.metrics.finalAccuracy}</p>
                    </div>
                    <div>
                      <p className="font-medium">Data Points Processed</p>
                      <p>{selectedJob.metrics.dataPointsProcessed}</p>
                    </div>
                    <div>
                      <p className="font-medium">Convergence Rate</p>
                      <p>{selectedJob.metrics.convergenceRate}</p>
                    </div>
                  </div>
                  
                  {selectedJob.status === 'completed' && (
                    <div className="mt-4">
                      <p className="font-medium">Improvement</p>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${parseFloat(selectedJob.improvement) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-green-600 font-medium">{selectedJob.improvement}</span>
                      </div>
                    </div>
                  )}
                </dd>
              </div>
              <div className={`${selectedJob.newModelName ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                <dt className="text-sm font-medium text-gray-500">Actions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      <ChartBarIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      View Detailed Metrics
                    </button>
                    {selectedJob.status === 'completed' && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <ArrowPathIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Start New Round
                      </button>
                    )}
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* New Training Job Modal */}
      {showNewJobModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowNewJobModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-light">
                  <ArrowPathIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    New Federated Learning Job
                  </h3>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="mb-4">
                  <label htmlFor="job-name" className="block text-sm font-medium text-gray-700">
                    Job Name
                  </label>
                  <input
                    type="text"
                    name="job-name"
                    id="job-name"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Turbine Efficiency Improvement"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="base-model" className="block text-sm font-medium text-gray-700">
                    Base Model
                  </label>
                  <select
                    id="base-model"
                    name="base-model"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>turbine-anomaly-v2</option>
                    <option>power-prediction-v1</option>
                    <option>maintenance-scheduler-v1</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Participating Edge Nodes
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
                  <label htmlFor="rounds" className="block text-sm font-medium text-gray-700">
                    Number of Rounds
                  </label>
                  <input
                    type="number"
                    name="rounds"
                    id="rounds"
                    min="1"
                    max="20"
                    defaultValue="5"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Privacy Settings
                  </label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="diff-privacy"
                        name="diff-privacy"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="diff-privacy" className="ml-2 block text-sm text-gray-900">
                        Enable Differential Privacy
                      </label>
                    </div>
                    <div className="pl-6">
                      <label htmlFor="epsilon" className="block text-sm font-medium text-gray-700">
                        Epsilon (Privacy Budget)
                      </label>
                      <input
                        type="range"
                        name="epsilon"
                        id="epsilon"
                        min="0.1"
                        max="1.0"
                        step="0.1"
                        defaultValue="0.5"
                        className="mt-1 w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>More Private</span>
                        <span>0.5</span>
                        <span>More Accurate</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="secure-agg"
                        name="secure-agg"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="secure-agg" className="ml-2 block text-sm text-gray-900">
                        Enable Secure Aggregation
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => setShowNewJobModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => {
                      // In a real app, we would handle the job creation here
                      setShowNewJobModal(false);
                    }}
                  >
                    Start Training
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
