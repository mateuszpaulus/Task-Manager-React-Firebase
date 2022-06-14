import React, { useState } from 'react';
import { firebase } from '../firebase';
import { useProjectsContext } from '../context/projects-context';
import { v4 as uuidv4 } from 'uuid';

export const AddProject = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  const projectId = uuidv4();
  const newDate = new Date();
  const { projects, setProjects } = useProjectsContext();

  const addProject = () =>
    projectTitle &&
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectTitle,
        userId: '048ByaC97FbY5CQ47',
        date: newDate
      })
      .then(() => {
        setProjects([...projects]);
        setProjectTitle('');
        setShowAddProject(false);
      });

  return (
    <div className="add-project" data-testid="add-project-test">
      {showAddProject && (
        <div className="add-project__confirmation" data-testid="add-project-confirmation">
          <input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="add-project__title"
            data-testid="add-project-title"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit">
            Add Project
          </button>
          <button
            data-testid="add-project__cancel"
            className="add-project__cancel"
            onClick={() => setShowAddProject(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowAddProject(false);
            }}
            type="button"
            tabIndex={0}>
            Cancel
          </button>
        </div>
      )}
      <div
        className="add-project__onclick"
        data-testid="add-project-action"
        onClick={() => setShowAddProject(!showAddProject)}
        onKeyDown={() => setShowAddProject(!showAddProject)}
        role="button"
        tabIndex={0}>
        <span className="add-project__plus">+</span>
        <span data-testid="add-project-action" className="add-project__text">
          AddProject
        </span>
      </div>
    </div>
  );
};
