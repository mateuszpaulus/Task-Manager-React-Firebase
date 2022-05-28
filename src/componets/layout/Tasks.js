/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Checkbox } from '../Checkbox';
import { AddTask } from '../AddTask';
import { useTasks } from '../../hooks/index'
import { collatedTasks } from '../../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers'
import { useSelectedProjectValue, useProjectsValue } from '../../context'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaTrashAlt } from 'react-icons/fa'


export const Tasks = () => {
    const { selectedProject, setSelectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks, setTasks } = useTasks(selectedProject);
    const [updateTasks, setUpdatedTasks] = useState(null);
    const [active, setActive] = useState(false);

    let projectName = '';

    if(projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)){
        projectName = getTitle(projects, selectedProject).name;
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
    }
    useEffect(() => {
        document.title = `${projectName}: Task Manager`;
    });
    
    const deleteTask = (id) => {
        firebase    
            .firestore()
            .collection('tasks')
            .doc(id)
            .delete()
            
    }

    useEffect(() => {
        setUpdatedTasks(tasks)  
    }, [tasks ]);

    const handleOnDragEnd = (result) => {
        
        if (!result.destination) return;
        console.log(result);
        if (updateTasks) {
            const items = Array.from(updateTasks); 
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
        
            setUpdatedTasks(items);

        }
        
    }

    return ( 
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='tasks'>
                        {(provided) => (
                                <ul 
                                    className="tasks__list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {updateTasks &&
                                    updateTasks.map((task, index) => (
                                        <Draggable
                                            key={`${task.id}`}
                                            draggableId={`${task.id}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                    // onClick={() => setActive(task.id)}
                                                >
                                                    <Checkbox id={task.id} />
                                                    <span>{task.task}</span>
                                                    <span
                                                        className={
                                                                    active === task.id
                                                                    ? 'active tasks__list-delete'
                                                                    : 'tasks__list-delete'
                                                                }
                                                        role="button"
                                                        onClick={() => {
                                                            deleteTask(task.id)
                                                            // setActive(task.id)
                                                        }}
                                                    >
                                                        <FaTrashAlt />
                                                    </span>
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




