import React from 'react';
import { Sidebar } from '../Sidebar';
import { TasksList } from '../TasksList';
import { useProjectsContext } from '../../context/projects-context';

export const Content = () => {
  const { darkMode } = useProjectsContext();
  return (
    <section className={darkMode ? 'darkmode' : undefined} data-testid="content-test">
      <Sidebar />
      <TasksList />
    </section>
  );
};
