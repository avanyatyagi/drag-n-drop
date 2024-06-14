import React, { useState } from 'react';
import ModuleList from './components/ModuleList';
import ModuleForm from './components/ModuleForm';
import Footer from './components/Foooter';
import emptyBoxImage from './Assets/box.png';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);

  const addModule = (name) => {
    setModules([...modules, { name, resources: [], links: [] }]);
  };

  const deleteModule = (index) => {
    const newModules = modules.filter((_, i) => i !== index);
    setModules(newModules);
  };

  const renameModule = (index, newName) => {
    const newModules = modules.map((module, i) =>
      i === index ? { ...module, name: newName } : module
    );
    setModules(newModules);
  };

  const addResource = (moduleIndex, resource) => {
    const newModules = modules.map((module, i) =>
      i === moduleIndex
        ? { ...module, resources: [...module.resources, resource] }
        : module
    );
    setModules(newModules);
  };

  const deleteResource = (moduleIndex, resourceId) => {
    const newModules = modules.map((module, i) => {
      if (i === moduleIndex) {
        const newResources = module.resources.filter(
          (resource) => resource.id !== resourceId
        );
        return { ...module, resources: newResources };
      }
      return module;
    });
    setModules(newModules);
  };

  const renameResource = (moduleIndex, resourceIndex, newName) => {
    const newModules = modules.map((module, i) =>
      i === moduleIndex
        ? {
            ...module,
            resources: module.resources.map((resource, ri) =>
              ri === resourceIndex ? { ...resource, name: newName } : resource
            ),
          }
        : module
    );
    setModules(newModules);
  };

  const addLink = (moduleIndex, link) => {
    const newModules = modules.map((module, i) =>
      i === moduleIndex ? { ...module, links: [...module.links, link] } : module
    );
    setModules(newModules);
  };

  const deleteLink = (moduleIndex, linkIndex) => {
    const newModules = modules.map((module, i) =>
      i === moduleIndex
        ? {
            ...module,
            links: module.links.filter((_, index) => index !== linkIndex),
          }
        : module
    );
    setModules(newModules);
  };

  const renameLink = (moduleIndex, linkIndex, newName) => {
    const newModules = modules.map((module, i) =>
      i === moduleIndex
        ? {
            ...module,
            links: module.links.map((link, li) =>
              li === linkIndex ? { ...link, name: newName } : link
            ),
          }
        : module
    );
    setModules(newModules);
  };

  const moveResource = (moduleIndex, dragIndex, hoverIndex) => {
    const newModules = [...modules];
    const [draggedResource] = newModules[moduleIndex].resources.splice(
      dragIndex,
      1
    );
    newModules[moduleIndex].resources.splice(hoverIndex, 0, draggedResource);
    setModules(newModules);
  };

  const moveLink = (moduleIndex, dragIndex, hoverIndex) => {
    const newModules = [...modules];
    const [draggedLink] = newModules[moduleIndex].links.splice(dragIndex, 1);
    newModules[moduleIndex].links.splice(hoverIndex, 0, draggedLink);
    setModules(newModules);
  };

  const moveModule = (dragIndex, hoverIndex) => {
    const newModules = [...modules];
    const [draggedModule] = newModules.splice(dragIndex, 1);
    newModules.splice(hoverIndex, 0, draggedModule);
    setModules(newModules);
  };

  return (
    <main>
      <div className="p-20 bg-gray-100 min-h-screen">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Course Builder
          </h1>
          <ModuleForm addModule={addModule} />
        </div>
        <div className="flex items-center justify-center h-full">
          {modules.length === 0 ? (
            <img src={emptyBoxImage} alt="Empty Box" />
          ) : (
            <div className="w-full md:w-2/3 lg:w-1/2">
              <ModuleList
                modules={modules}
                deleteModule={deleteModule}
                renameModule={renameModule}
                addResource={addResource}
                deleteResource={deleteResource}
                renameResource={renameResource}
                addLink={addLink}
                deleteLink={deleteLink}
                renameLink={renameLink}
                moveResource={moveResource}
                moveLink={moveLink}
                moveModule={moveModule} // Pass moveModule function
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default App;
