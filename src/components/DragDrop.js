import React from 'react';
import DraggableItem from './DraggableItem';
import { FaLink } from "react-icons/fa";
import { BsFileEarmarkPdf } from "react-icons/bs";

const ItemType = {
  RESOURCE: 'resource',
  LINK: 'link',
};

const DragAndDrop = ({
  resources,
  links,
  moveResource,
  moveLink,
  editResource,
  deleteResource,
  editLink,
  deleteLink
}) => {
  const moveItem = (dragIndex, hoverIndex, type) => {
    if (type === ItemType.RESOURCE) {
      moveResource(dragIndex, hoverIndex);
    } else {
      moveLink(dragIndex, hoverIndex);
    }
  };

  return (
    <div>
      {resources.map((resource, index) => (
        <div key={resource.id} className='flex flex-row-reverse justify-between items-center'>
          
          <DraggableItem
            id={resource.id}
            name={resource.name}
            type={ItemType.RESOURCE}
            index={index}
            moveItem={(dragIndex, hoverIndex) =>
              moveItem(dragIndex, hoverIndex, ItemType.RESOURCE)
            }
            onEdit={editResource}
            onDelete={deleteResource}
          />
          <BsFileEarmarkPdf className="text-xl font-semibold mb-2 text-blue-500 " />
        </div>
      ))}
      <hr />
      {links.map((link, index) => (
        <div key={link.id} className='flex flex-row gap-2 items-center'>
          <FaLink className="text-xl font-semibold mb-2 text-green-500" />
          <DraggableItem
            id={link.id}
            name={link.name}
            type={ItemType.LINK}
            index={index}
            moveItem={(dragIndex, hoverIndex) =>
              moveItem(dragIndex, hoverIndex, ItemType.LINK)
            }
            onEdit={editLink}
            onDelete={deleteLink}
            
          />
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
