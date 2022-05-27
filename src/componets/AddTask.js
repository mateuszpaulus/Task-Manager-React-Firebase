import React, { useState } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa'
import moment from 'moment'
import { firebase } from '../firebase';
import { useSelectedProjectValue } from "../context";
import { ProjectOverlay } from './ProjectOverlay'
import { TaskDate } from './TaskDate'

export const AddTask = ({
    showAddTaskMain = true,
    shouldShowMain = false,
    showQuickAddTask,
    setShowQuickAddTask
}) => {
    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(shouldShowMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);

    const { selectedProject } = useSelectedProjectValue();

    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = ''

        if (projectId === 'NOWADAYS') {
            collatedDate = moment().format('DD/MM/YYYY')
        } else if (projectId === 'INCOMING') {
            collatedDate = moment()
                .add(7, 'days')
                .format('DD/MM/YYYY')
        }
        console.log(task, collatedDate, projectId, )
        return (
            task &&
            projectId &&
            firebase
                .firestore()
                .collection('tasks')
                .add({
                    archived: false,
                    projectId,
                    task,
                    date: collatedDate || taskDate,
                    userId: '048ByaC97FbY5CQ47'
                })
                .then(() => {
                    setTask('')
                    setProject('')
                    setShowMain('')
                    setShowProjectOverlay(false)
                })
        )
        
    }

    return (
        <div
            className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task' }
            data-testid ="add-task-comp"
        >
            {showAddTaskMain && (
                <div
                    className="add-task__shallow"
                    data-testid="show-main-action"
                    onClick={() => setShowMain(!showMain)}
                    onKeyDown={() => setShowMain(!showMain)}
                    tabIndex={0}
                    role="button"
                >
                    <span className="add-task__plus">+</span>
                    <span className="add-task__text">Add Task</span>
                </div>
            )}
            {(showMain || showQuickAddTask) && (
                <div className="add-task__main" data-testid="add-task-main">
                    {showQuickAddTask && (
                        <div data-testid="quick-add-task"
                        >
                            <h2 className="header">
                                Quick AddTask
                            </h2>
                        </div> 
                    )}
                    <ProjectOverlay 
                        setProject={setProject}
                        showProjectOverlay={showProjectOverlay}
                        setShowProjectOverlay={setShowProjectOverlay}
                        showQuickAddTask={showQuickAddTask}
                    />
                    <TaskDate 
                        setTaskDate={setTaskDate}
                        showTaskDate={showTaskDate}
                        setShowTaskDate={setShowTaskDate}
                        showQuickAddTask={showQuickAddTask}
                    />
                    <input 
                        className="add-task__content"
                        data-testid="add-task-content"
                        type="text"
                        value={task}
                        onChange={e => setTask(e.target.value)}
                    />
                    < button
                        type="button"
                        className="add-task__submit"
                        data-testid="add-task"
                        onClick={() => { 
                            showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask() 
                        }}
                    >
                        Add Task
                    </button>
                    
                    <button
                            className="add-task__cancel"
                            data-testid="add-task-main-cancel"
                            onClick={() => {
                                setShowMain(false)
                                setShowQuickAddTask(false)
                                setShowProjectOverlay(false)
                            }}
                            onKeyPress={() => {
                                setShowMain(false)
                                setShowQuickAddTask(false)
                                setShowProjectOverlay(false)
                            }}
                            tabIndex={0}
                            type="button"
                        >
                            Cancel
                        </button>
                        
                    <span
                        className="add-task__project"
                        data-testid="show-task-project-overlay"
                        onClick={() => setShowProjectOverlay(!showProjectOverlay)}
                        onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
                        tabIndex={0}
                        role="button"
                    >
                        <FaRegListAlt />
                    </span>
                    <span   
                        className="add-task__date"
                        data-testid="show-task-date-overlay"
                        onClick={() => setShowTaskDate(!showTaskDate)}
                        onKeyDown={() => setShowTaskDate(!showTaskDate)}
                    >
                        <FaRegCalendarAlt />
                    </span>
                </div>
            )}
        </div>
    )


}