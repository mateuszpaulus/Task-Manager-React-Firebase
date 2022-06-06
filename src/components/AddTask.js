import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { AddProjectToTask } from './AddProjectToTask';
import { AddDateToTask } from './AddDateToTask';
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
  const [showProject, setShowProject] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const addTask = () => {
    const taskId = uuidv4();
    const projectId = project || selectedProject;
    let dateAdded = '';

    if (projectId === 'FORTODAY') {
      dateAdded = moment().format('DD/MM/YYYY');
    } else if (projectId === 'ONLYWEEK') {
      dateAdded = moment().add(7, 'days').format('DD/MM/YYYY');
    } else if (projectId === 'THISMONTH') {
      dateAdded = moment().add(1, 'months').format('DD/MM/YYYY');
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
          date: dateAdded || taskDate,
          userId: '048ByaC97FbY5CQ47',
          taskId
        })
        .then(() => {
          setTitle('');
          setProject('');
          setShowMainAddTask('');
          setShowProject(false);
          setShowTaskDate(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__confirmation' : 'add-task'}
      data-testid="add-task-comp">
      <div
        className="add-task__main"
        data-testid="show-add-task-main"
        onClick={() => setShowMainAddTask(!showMainAddTask)}
        onKeyDown={() => setShowMainAddTask(!showMainAddTask)}
        tabIndex={0}
        role="button">
        <span className="add-task__plus">+</span>
        <span className="add-task__text">Add Task</span>
      </div>

      {(showMainAddTask || showQuickAddTask) && (
        <div className="add-task__show" data-testid="add-task-show">
          {showQuickAddTask && (
            <div data-testid="quick-add-task">
              <h2 className="header">Quick AddTask</h2>
            </div>
          )}
          <AddProjectToTask
            setProject={setProject}
            showProject={showProject}
            setShowProject={setShowProject}
          />
          <AddDateToTask
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__title"
            data-testid="add-task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name your task"
          />
          <button
            type="button"
            className="add-task__submit"
            data-testid="add-task-submit"
            onClick={() => {
              showQuickAddTask ? addTask() && setShowQuickAddTask(false) : addTask();
            }}>
            Add Task
          </button>
          <button
            className="add-task__cancel"
            data-testid="add-task-cancel"
            onClick={() => {
              if (showQuickAddTask) {
                setShowQuickAddTask(false);
              }
              setShowMainAddTask(false);
              setShowProject(false);
              setShowTaskDate(false);
            }}
            onKeyDown={() => {
              if (showQuickAddTask) {
                setShowQuickAddTask(false);
              }
              setShowMainAddTask(false);
              setShowProject(false);
              setShowTaskDate(false);
            }}
            tabIndex={0}
            type="button">
            Cancel
          </button>
          <span
            className="add-task__project"
            data-testid="show-task-project"
            onClick={() => setShowProject(!showProject)}
            onKeyDown={() => setShowProject(!showProject)}
            tabIndex={0}
            role="button">
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            data-testid="show-task-date"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={() => setShowTaskDate(!showTaskDate)}>
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};
