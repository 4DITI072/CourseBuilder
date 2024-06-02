import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FiEdit, FiTrash } from 'react-icons/fi';
import './Resource.css';

const Resource = ({ resource, moduleId, onRename, onDelete, onMoveResource }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'RESOURCE',
    item: { id: resource.id, moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'RESOURCE',
    hover: (draggedItem) => {
      // If the resource is being dropped onto a different module
      if (draggedItem.moduleId !== moduleId) {
        // Move the resource to the new module
        onMoveResource(draggedItem.id, draggedItem.moduleId, resource.id, moduleId);
        draggedItem.moduleId = moduleId; // Update the dragged item's module ID
      }
    },
  }));

  return (
    <div ref={(node) => drag(drop(node))} className="resource" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span>{resource.name}</span>
      <button onClick={() => onRename(resource.id)}><FiEdit /></button>
      <button onClick={() => onDelete(resource.id)}><FiTrash /></button>
    </div>
  );
};

export default Resource;
