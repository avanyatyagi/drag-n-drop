import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineDownload } from 'react-icons/ai'; // Import the download icon

const ItemType = {
  RESOURCE: 'resource',
  LINK: 'link',
};

const DraggableItem = ({ id, name, type, index, moveItem, onEdit, onDelete, fileUrl }) => {
  const [, ref] = useDrag({
    type,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDownload = (fileUrl) => {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
  
    // Set the href attribute to the file URL
    anchor.href = fileUrl;
  
    // Set the download attribute to specify the filename
    anchor.download = 'filename.pdf'; // Example filename, replace with the actual filename
  
    // Programmatically click the anchor to trigger the download
    anchor.click();
  };
  
  return (
   
    <div ref={(node) => ref(drop(node))} className="font-bold items-center flex rounded gap-20">
      {name}
     
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
            
          <FiMoreVertical />
        </button>
        {isMenuOpen && (
          <div className="absolute p-2 right-0 mt-2 w-32 bg-white border text-sm font-semibold rounded shadow-md z-10">
            <button
              onClick={() => {
                const newName = prompt('Enter new name:', name);
                if (newName) {
                  onEdit(id, newName);
                }
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              Edit
            </button>
            <hr />
            <button
              onClick={() => {
                onDelete(id);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-500"
            >
              Delete
            </button>
            {type === ItemType.RESOURCE && ( // Render the download button only for resources
              <button
                onClick={() => handleDownload(fileUrl)} // Pass fileUrl to handleDownload function
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 "
              >
                Download
              </button>
            )}
          </div>
        )}
      </div>
    

  );
};

export default DraggableItem;
