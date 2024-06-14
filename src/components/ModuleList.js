import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDrop from './DragDrop';
import AddResourceModal from '../custom/R_Modal';
import AddLinkModal from '../custom/L_Modal';
import { FiMoreVertical } from 'react-icons/fi';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { BsPlusSquare, BsLink, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Collapse } from 'react-collapse';

const ItemType = {
  MODULE: 'module',
};

const DraggableModule = ({ module, index, moveModule, children }) => {
  const [, ref] = useDrag({
    type: ItemType.MODULE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.MODULE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveModule(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <li ref={(node) => ref(drop(node))} className="p-4 border rounded shadow relative">
      {children}
    </li>
  );
};

const ModuleList = ({
  modules,
  deleteModule,
  renameModule,
  addResource,
  deleteResource,
  addLink,
  deleteLink,
  moveResource,
  moveLink,
  editResource,
  editLink,
  moveModule, // Accept moveModule as prop
}) => {
  const [isResourceModalOpen, setResourceModalOpen] = useState(false);
  const [isLinkModalOpen, setLinkModalOpen] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [accordionState, setAccordionState] = useState({});

  const toggleAccordion = (index) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const openResourceModal = (moduleIndex) => {
    setCurrentModuleIndex(moduleIndex);
    setResourceModalOpen(true);
    setIsMenuOpen(null);
  };

  const openLinkModal = (moduleIndex) => {
    setCurrentModuleIndex(moduleIndex);
    setLinkModalOpen(true);
    setIsMenuOpen(null);
  };

  const closeResourceModal = () => setResourceModalOpen(false);
  const closeLinkModal = () => setLinkModalOpen(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <ul className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <DraggableModule key={moduleIndex} index={moduleIndex} moveModule={moveModule} module={module}>
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-semibold cursor-pointer"
                  onClick={() => toggleAccordion(moduleIndex)}
                >
                  <IoMdArrowDropdownCircle />
                </h2>
                <div className="flex-1 font-bold p-2 rounded mr-2 mb-2">
                  {module.name}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(isMenuOpen === moduleIndex ? null : moduleIndex)}
                    className="focus:outline-none"
                  >
                    <FiMoreVertical />
                  </button>
                  {isMenuOpen === moduleIndex && (
                    <div className="absolute right-0 mt-2 w-60 bg-white border rounded shadow-md text-lg font-semibold z-10 p-2">
                      <button
                        onClick={() => openResourceModal(moduleIndex)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                      >
                        <BsPlusSquare className="mr-2" /> Add Resource
                      </button>
                      <hr />
                      <button
                        onClick={() => openLinkModal(moduleIndex)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                      >
                        <BsLink className="mr-2" /> Add Link
                      </button>
                      <hr />
                      <button
                        onClick={() => renameModule(moduleIndex, prompt('Enter new module name'))}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                      >
                        <BsPencilSquare className="mr-2" /> Rename Module
                      </button>
                      <hr />
                      <button
                        onClick={() => deleteModule(moduleIndex)}
                        className="block w-full text-left px-4 py-2 text-red-500 flex items-center"
                      >
                        <BsTrash className="mr-2" /> Delete Module
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Collapse isOpened={accordionState[moduleIndex]}>
                <hr />
                <div className="pl-4 pr-4">
                  <DragAndDrop
                    resources={module.resources}
                    links={module.links}
                    moveResource={(dragIndex, hoverIndex) => moveResource(moduleIndex, dragIndex, hoverIndex)}
                    moveLink={(dragIndex, hoverIndex) => moveLink(moduleIndex, dragIndex, hoverIndex)}
                    editResource={(resourceId, newName) => editResource(moduleIndex, resourceId, newName)}
                    deleteResource={(resourceId) => deleteResource(moduleIndex, resourceId)}
                    editLink={(linkId, newName) => editLink(moduleIndex, linkId, newName)}
                    deleteLink={(linkId) => deleteLink(moduleIndex, linkId)}
                  />
                </div>
              </Collapse>
            </DraggableModule>
          ))}
        </ul>
        <AddResourceModal
          isOpen={isResourceModalOpen}
          onClose={closeResourceModal}
          addResource={(resource) => addResource(currentModuleIndex, resource)}
        />
        <AddLinkModal
          isOpen={isLinkModalOpen}
          onClose={closeLinkModal}
          addLink={(link) => addLink(currentModuleIndex, link)}
        />
      </div>
    </DndProvider>
  );
};

export default ModuleList;
