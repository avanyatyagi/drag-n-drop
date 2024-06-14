import React, { useState } from 'react';

const AddResourceModal = ({ isOpen, onClose, addResource }) => {
  const [resourceName, setResourceName] = useState('');
  const [resourceFile, setResourceFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resourceFile) {
      try {
        await addResource({ name: resourceName, file: resourceFile });
        setResourceName('');
        setResourceFile(null);
        onClose();
      } catch (err) {
        setError('Failed to add resource');
        console.error(err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add New Resource</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="resourceName" className="text-gray-700 mb-1 block">Resource Name</label>
            <input
              type="text"
              id="resourceName"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              placeholder="Enter resource name"
              className="border border-gray-300 p-2 rounded focus:outline-none w-full"
              required
            />
          </div>
          <div className="mb-4 relative">
            {/* <label htmlFor="resourceFile" className="text-gray-700 mb-1 block">Select File</label> */}
            <input
              type="file"
              id="resourceFile"
              onChange={(e) => setResourceFile(e.target.files[0])}
              className="hidden"
              required
            />
            <label htmlFor="resourceFile" className="bg-[#008392] text-white p-2 rounded-md cursor-pointer  transition duration-300 ease-in-out focus:outline-none w-full text-center">
              Upload File
            </label>
            {resourceFile && (
              <p className="text-gray-700 mt-2">{resourceFile.name}</p>
            )}
          </div>
          <button type="submit" className="bg-[#008392] text-white p-2 rounded focus:outline-none w-full">
            Add Resource
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <button onClick={onClose} className="bg-white text-gray-700 p-2 rounded border focus:outline-none w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default AddResourceModal;
