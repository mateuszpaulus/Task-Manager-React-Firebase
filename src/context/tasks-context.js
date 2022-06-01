import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TasksContext = createContext();
export const TasksProvider = ({ children }) => {
  const [showMainAddTask, setShowMainAddTask] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  return (
    <TasksContext.Provider
      value={{
        showMainAddTask,
        setShowMainAddTask,
        showQuickAddTask,
        setShowQuickAddTask
      }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);

TasksProvider.propTypes = {
  children: PropTypes.node.isRequired
};
