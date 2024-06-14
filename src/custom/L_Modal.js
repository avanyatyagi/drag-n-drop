import React, { useState } from "react";

const AddLinkModal = ({ isOpen, onClose, addLink }) => {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink({ name: linkName, url: linkUrl });
    setLinkName("");
    setLinkUrl("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add New Link</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="linkUrl" className="text-gray-700 mb-1 block font-bold">
              URL
            </label>
            <input
              type="url"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter link URL"
              className="border border-gray-300 p-2 rounded focus:outline-none w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="linkName" className="text-gray-700 mb-1 block font-bold">
              Display Name
            </label>
            <input
              type="text"
              id="linkName"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="Enter link name"
              className="border border-gray-300 p-2 rounded focus:outline-none w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#008392] text-white p-2 rounded  w-full"
          >
            Add Link
          </button>
        </form>
        <button
          onClick={onClose}
          className="bg-white border text-gray-700 p-2 rounded focus:outline-none w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddLinkModal;
