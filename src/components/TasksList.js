import React, { useEffect, useState } from 'react';
import { AddTask } from './AddTask';
import { useTasks } from '../hooks/index';
import {
  getProjectTitle,
  getConstantsTitle,
  constantsProjects,
  mainProjects
} from '../constants/constants';
import { useProjectsContext } from '../context/projects-context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SingleTask } from './SingleTask';
// import { firebase } from '../firebase';

export const TasksList = () => {
  const { projects, selectedProject, showSidebar } = useProjectsContext();
  const { tasks } = useTasks(selectedProject);
  const [updatedTasks, setUpdatedTasks] = useState(null);

  let [projectTitle] = useState('');

  if (constantsProjects(selectedProject) && selectedProject) {
    projectTitle = getConstantsTitle(mainProjects, selectedProject)?.name;
  }
  if (projects && projects.length > 0 && selectedProject && !constantsProjects(selectedProject)) {
    projectTitle = getProjectTitle(projects, selectedProject)?.name;
  }
  useEffect(() => {
    document.title = `${projectTitle}: Task Manager`;
  });

  useEffect(() => {
    setUpdatedTasks(tasks);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(updatedTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUpdatedTasks(items);
  };

  return (
    <div className={showSidebar ? 'tasks tasks__show' : 'tasks'} data-testid="tasks-test">
      <h2 data-testid="project-name">{projectTitle}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul className="tasks__list" {...provided.droppableProps} ref={provided.innerRef}>
              {updatedTasks &&
                updatedTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>
                        <SingleTask task={task} />
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <AddTask />
    </div>
  );
};
