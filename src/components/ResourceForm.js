import React, { useState } from 'react';

const ResourceForm = ({ addResource }) => {
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
      } catch (err) {
        setError('Failed to add resource');
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Resource to the Module</h2>
      <div className="mb-4">
        <input
          type="text"
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          placeholder="Enter resource name"
          className="border border-gray-300 p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-4 relative">
        <input
          type="file"
          onChange={(e) => setResourceFile(e.target.files[0])}
          className=" border-gray-300 p-2 rounded w-full appearance-none"
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Add Resource
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ResourceForm;
