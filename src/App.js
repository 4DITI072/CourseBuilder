// src/App.js
import React, { useState } from 'react';
import DragAndDrop from './components/common/DragAndDrop';
import Module from './components/Module/Module';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState('');

  const addModule = () => {
    setModules([...modules, { id: Date.now(), name: newModule, resources: [] }]);
    setNewModule('');
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(module => module.id === id ? { ...module, name: newName } : module));
  };

  const deleteModule = id => {
    setModules(modules.filter(module => module.id !== id));
  };

  const addResource = (moduleId, resourceName) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, resources: [...module.resources, { id: Date.now(), name: resourceName }] } : module
    ));
  };

  const moveResource = (resourceId, sourceModuleId, targetResourceId, targetModuleId) => {
    const sourceModule = modules.find(module => module.id === sourceModuleId);
    const targetModule = modules.find(module => module.id === targetModuleId);

    if (!sourceModule || !targetModule) return;

    const resource = sourceModule.resources.find(r => r.id === resourceId);

    // Remove resource from source module
    sourceModule.resources = sourceModule.resources.filter(r => r.id !== resourceId);

    if (sourceModuleId === targetModuleId) {
      // Move within the same module
      const targetResourceIndex = sourceModule.resources.findIndex(r => r.id === targetResourceId);
      if (targetResourceIndex >= 0) {
        sourceModule.resources.splice(targetResourceIndex, 0, resource);
      } else {
        sourceModule.resources.push(resource);
      }
    } else {
      // Move across modules
      const targetResourceIndex = targetModule.resources.findIndex(r => r.id === targetResourceId);
      if (targetResourceIndex >= 0) {
        targetModule.resources.splice(targetResourceIndex, 0, resource);
      } else {
        targetModule.resources.push(resource);
      }
    }

    setModules([...modules]);
  };

  return (
    <DragAndDrop>
      <div className="app">
        <h1>Course Builder</h1>
        <div className="modules">
          {modules.map(module => (
            <Module
              key={module.id}
              module={module}
              onRename={renameModule}
              onDelete={deleteModule}
              onAddResource={addResource}
              onMoveResource={moveResource}
            />
          ))}
        </div>
        <div className="new-module">
          <input
            type="text"
            value={newModule}
            onChange={e => setNewModule(e.target.value)}
          />
          <button onClick={addModule}>Add Module</button>
        </div>
      </div>
    </DragAndDrop>
  );
};

export default App;
