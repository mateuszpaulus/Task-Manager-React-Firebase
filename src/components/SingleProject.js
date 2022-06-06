import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsContext } from '../context/projects-context';
import { firebase } from '../firebase';

export const SingleProject = ({ project }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects, setSelectedProject, setActiveProject } = useProjectsContext();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject('INPROGRESS');
        setActiveProject('inprogress');
      });
  };
  return (
    <>
      <span className="sidebar__dot">•</span>
      <span>{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm);
        }}
        tabIndex={0}
        role="button">
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-icon">
            <div className="project-delete-icon__confirmation">
              <p>Are you sure you want delete this project?</p>
              <button type="button" onClick={() => deleteProject(project.docId)}>
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setShowConfirm(!showConfirm);
                }}
                tabIndex={0}
                type="button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </span>
    </>
  );
};

SingleProject.propTypes = {
  project: PropTypes.object.isRequired
};
