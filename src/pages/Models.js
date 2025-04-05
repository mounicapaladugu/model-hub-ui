import React, { useState } from 'react';
import { 
  PlusIcon, 
  ArrowUpTrayIcon, 
  ChevronRightIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

// Mock data for models
const modelsMock = [
  { 
    id: 1, 
    name: 'turbine-anomaly-v2', 
    type: 'Anomaly Detection',
    framework: 'PyTorch',
    size: '15.4 MB',
    accuracy: '94.2%',
    lastUpdated: '2025-03-30',
    status: 'active',
    deployedTo: ['Edge Node 1', 'Edge Node 3'],
    description: 'Detects anomalies in turbine operation using vibration and temperature data.'
  },
  { 
    id: 2, 
    name: 'power-prediction-v1', 
    type: 'Regression',
    framework: 'TensorFlow Lite',
    size: '8.7 MB',
    accuracy: '91.5%',
    lastUpdated: '2025-03-15',
    status: 'active',
    deployedTo: ['Edge Node 2'],
    description: 'Predicts power output based on wind speed and direction.'
  },
  { 
    id: 3, 
    name: 'maintenance-scheduler-v1', 
    type: 'Classification',
    framework: 'PyTorch',
    size: '12.2 MB',
    accuracy: '89.8%',
    lastUpdated: '2025-02-20',
    status: 'inactive',
    deployedTo: [],
    description: 'Classifies maintenance urgency based on operational metrics.'
  },
];

export default function Models() {
  const [models, setModels] = useState(modelsMock);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Models</h1>
        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Upload Model
        </button>
      </div>

      {/* Models list */}
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {models.map((model) => (
            <li key={model.id}>
              <div 
                className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${selectedModel?.id === model.id ? 'bg-gray-50' : ''}`}
                onClick={() => handleModelSelect(model)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-primary truncate">{model.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        model.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {model.status === 'active' ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {model.type}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {model.framework}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Updated on <time dateTime={model.lastUpdated}>{model.lastUpdated}</time>
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Model details */}
      {selectedModel && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Model Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {selectedModel.description}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Model name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedModel.name}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedModel.type}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Framework</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedModel.framework}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Size</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedModel.size}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Accuracy</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{selectedModel.accuracy}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deployed to</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {selectedModel.deployedTo.length > 0 ? (
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {selectedModel.deployedTo.map((node, index) => (
                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <div className="w-0 flex-1 flex items-center">
                            <CheckCircleIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                            <span className="ml-2 flex-1 w-0 truncate">{node}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center text-sm text-gray-500">
                      <ExclamationCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" aria-hidden="true" />
                      Not deployed to any edge nodes
                    </div>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Actions</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Deploy
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      View History
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Delete
                    </button>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Upload Model Modal */}
      {showUploadModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowUploadModal(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-light">
                  <ArrowUpTrayIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Upload New Model
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Upload a new model to deploy to edge nodes. Supported formats: PyTorch (.pt), TensorFlow Lite (.tflite), ONNX (.onnx)
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <div className="mb-4">
                  <label htmlFor="model-name" className="block text-sm font-medium text-gray-700">
                    Model Name
                  </label>
                  <input
                    type="text"
                    name="model-name"
                    id="model-name"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., turbine-anomaly-v3"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="model-type" className="block text-sm font-medium text-gray-700">
                    Model Type
                  </label>
                  <select
                    id="model-type"
                    name="model-type"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>Anomaly Detection</option>
                    <option>Classification</option>
                    <option>Regression</option>
                    <option>Time Series</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="model-framework" className="block text-sm font-medium text-gray-700">
                    Framework
                  </label>
                  <select
                    id="model-framework"
                    name="model-framework"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option>PyTorch</option>
                    <option>TensorFlow Lite</option>
                    <option>ONNX</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Model File
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PyTorch, TensorFlow Lite, or ONNX up to 100MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="model-description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="model-description"
                    name="model-description"
                    rows={3}
                    className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Brief description of the model and its purpose"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    onClick={() => {
                      // In a real app, we would handle the upload here
                      setShowUploadModal(false);
                    }}
                  >
                    Upload
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
