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
    <div className="add-project" data-testid="add-project">
      {showAddProject && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            type="text"
            placeholder="Name your projct"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit">
            Add Project
          </button>
          <span
            data-testid="hide-project-overlay"
            className="add-project__cancel"
            onClick={() => setShowAddProject(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setShowAddProject(false);
            }}
            role="button"
            tabIndex={0}>
            Cancel
          </span>
        </div>
      )}
      <div
        className="add-project__field"
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
