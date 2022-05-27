import React from 'react';
import { Header } from './componets/layout/Header';
import { ProjectsProvider } from './context/projects-context';
import { SelectedProjectProvider}  from './context/selected-project-context';
import { Sidebar } from './componets/layout/Sidebar';
import { Tasks } from './componets/layout/Tasks';

export const App = () => { 
  return (
      <SelectedProjectProvider>
        <ProjectsProvider>
          <main
            data-testid="application" 
            className="main__aplication"
          >
            <Header />
            <Sidebar />
            <Tasks />
          </main>
        </ProjectsProvider>
      </SelectedProjectProvider>
)};

//useContext for many location

