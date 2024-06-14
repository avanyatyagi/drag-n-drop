import React from 'react';

const ResourceList = ({ resources, deleteResource, renameResource,setResourceFile }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Resources</h3>
      <ul className="space-y-2">
        {resources.map((resource, index) => (
          <li key={index} className="flex items-center space-x-2">
            <input
              type="text"
              value={resource.name}
              onChange={(e) => renameResource(index, e.target.value)}
              className="border p-2 rounded flex-1"
            />
            <span onChange={(e) => setResourceFile(e.target.files.value)}>{resource.resourceFile}</span>
            <button
              onClick={() => deleteResource(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
