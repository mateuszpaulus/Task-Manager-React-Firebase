import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
// import PropTypes from 'prop-types';
import moment from 'moment';
// import { format } from 'date-fns';
import { firebase } from '../firebase';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { useProjectsContext } from '../context/projects-context';
import { useTasksContext } from '../context/tasks-context';
import { v4 as uuidv4 } from 'uuid';

export const AddTask = () => {
  const { selectedProject } = useProjectsContext();
  const { showMainAddTask, setShowMainAddTask, showQuickAddTask, setShowQuickAddTask } =
    useTasksContext();

  const [title, setTitle] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const addTask = () => {
    const taskId = uuidv4();
    const projectId = project || selectedProject;
    let collatedDate = '';

    if (projectId === 'FORTODAY') {
      collatedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'ONLYWEEK') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY');
    }

    return (
      title &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          title,
          date: collatedDate || taskDate,
          userId: '048ByaC97FbY5CQ47',
          taskId
        })
        .then(() => {
          setTitle('');
          setProject('');
          setShowMainAddTask('');
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp">
      <div
        className="add-task__shallow"
        data-testid="show-main-action"
        onClick={() => setShowMainAddTask(!showMainAddTask)}
        onKeyDown={() => setShowMainAddTask(!showMainAddTask)}
        tabIndex={0}
        role="button">
        <span className="add-task__plus">+</span>
        <span className="add-task__text">Add Task</span>
      </div>

      {(showMainAddTask || showQuickAddTask) && (
        <div className="add-task__main" data-testid="add-task-main">
          {showQuickAddTask && (
            <div data-testid="quick-add-task">
              <h2 className="header">Quick AddTask</h2>
            </div>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            data-testid="add-task-content"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name your task"
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task"
            onClick={() => {
              showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask();
            }}>
            Add Task
          </button>
          {(!showQuickAddTask || showQuickAddTask) && (
            <button
              className="add-task__cancel"
              data-testid="add-task-main-cancel"
              onClick={() => {
                if (showQuickAddTask === true) {
                  setShowQuickAddTask(false);
                }
                setShowMainAddTask(false);
                setShowProjectOverlay(false);
                setShowTaskDate(false);
              }}
              onKeyDown={() => {
                if (showQuickAddTask === true) {
                  setShowQuickAddTask(false);
                }
                setShowMainAddTask(false);
                setShowProjectOverlay(false);
                setShowTaskDate(false);
              }}
              tabIndex={0}
              type="button">
              Cancel
            </button>
          )}
          <span
            className="add-task__project"
            data-testid="show-task-project-overlay"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={() => setShowProjectOverlay(!showProjectOverlay)}
            tabIndex={0}
            role="button">
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date-overlay"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}>
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
