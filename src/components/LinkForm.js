import React, { useState } from 'react';

const LinkForm = ({ addLink }) => {
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addLink({ name: linkName, url: linkUrl });
    setLinkName('');
    setLinkUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={linkName}
        onChange={(e) => setLinkName(e.target.value)}
        placeholder="Enter link name"
        className="border p-2 rounded mr-2"
        required
      />
      <input
        type="url"
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
        placeholder="Enter link URL"
        className="border p-2 rounded mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Link
      </button>
    </form>
  );
};

export default LinkForm;
