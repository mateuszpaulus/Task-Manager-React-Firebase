import React from 'react';
import { Header } from './componets/layout/Header';
import { ProjectsProvider } from './context/projects-context';
import { TasksProvider } from './context/tasks-context';
import { Content } from './componets/layout/Content';

export const App = () => {
  return (
    <ProjectsProvider>
      <TasksProvider>
        <main data-testid="app">
          <Header />
          <Content />
        </main>
      </TasksProvider>
    </ProjectsProvider>
  );
};
