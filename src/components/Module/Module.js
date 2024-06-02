import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import Resource from '../Resource/Resource';
import { useDrop } from 'react-dnd';
import './Module.css';

const Module = ({ module, onRename, onDelete, onAddResource, onMoveResource }) => {
  const [newResource, setNewResource] = useState('');

  const handleRename = () => {
    const newName = prompt('Rename module:', module.name);
    if (newName) {
      onRename(module.id, newName);
    }
  };

  const handleResourceDrop = (draggedItem) => {
    const { id: resourceId, moduleId: sourceModuleId } = draggedItem;
    const targetModuleId = module.id;
    if (sourceModuleId !== targetModuleId) {
      onMoveResource(resourceId, sourceModuleId, null, targetModuleId);
      draggedItem.moduleId = targetModuleId;
    }
  };

  const [, drop] = useDrop(() => ({
    accept: 'RESOURCE',
    drop: handleResourceDrop,
  }));

  return (
    <div ref={drop} className="module">
      <div className="module-header">
        <h2>{module.name}</h2>
        <button onClick={handleRename}><FiEdit /></button>
        <button onClick={() => onDelete(module.id)}><FiTrash /></button>
      </div>
      <div className="module-resources">
        {module.resources.map(resource => (
          <Resource
            key={resource.id}
            resource={resource}
            moduleId={module.id}
            onRename={onRename}
            onDelete={onDelete}
            onMoveResource={onMoveResource}
          />
        ))}
      </div>
      <div className="module-footer">
        <input
          type="text"
          value={newResource}
          onChange={e => setNewResource(e.target.value)}
        />
        <button onClick={() => { onAddResource(module.id, newResource); setNewResource(''); }}>
          Add Resource
        </button>
      </div>
    </div>
  );
};

export default Module;
