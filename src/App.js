import React from 'react';
import { Header } from './components/layout/Header';
import { ProjectsProvider } from './context/projects-context';
import { TasksProvider } from './context/tasks-context';
import { Content } from './components/layout/Content';

export const App = () => {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <main data-testid="app-test">
          <Header />
          <Content />
        </main>
      </TasksProvider>
    </ProjectsProvider>
  );
};
