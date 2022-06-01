import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import PropTypes from 'prop-types';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { firebase } from '../firebase';

export const SingleTask = ({ task }) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const [activeChangeTask, setActiveChangeTask] = useState(false);
  const [disabledInput] = useState(true);
  const deleteTask = (id) => {
    firebase.firestore().collection('tasks').doc(id).delete();
  };
  const editTaskTitle = (task, title) => {
    firebase.firestore().collection('tasks').doc(task.id).update({ title: title });
  };
  const onChange = (e) => {
    e.preventDefault();
    task.title = '';
    setNewTitle(e.target.value);
  };

  return (
    <>
      <Checkbox id={task.id} />
      <input
        className="tasks__list-input"
        type={activeChangeTask ? 'text' : 'hidden'}
        value={task.title === '' ? newTitle : task.title}
        onChange={onChange}
        disabled={activeChangeTask ? '' : disabledInput}
      />
      {activeChangeTask ? null : <span>{task.title}</span>}
      <button
        className="tasks__list-edit"
        type="type"
        onClick={() => {
          editTaskTitle(task, newTitle);
          setActiveChangeTask(!activeChangeTask);
        }}>
        <FaEdit />
      </button>
      <button
        className="tasks__list-delete"
        type="button"
        onClick={() => {
          deleteTask(task.id);
        }}>
        <FaTrashAlt />
      </button>
    </>
  );
};

SingleTask.propTypes = {
  task: PropTypes.object.isRequired
};
