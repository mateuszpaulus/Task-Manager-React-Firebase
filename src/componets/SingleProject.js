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
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={() => setShowConfirm(!showConfirm)}
        tabIndex={0}
        role="button">
        <FaTrashAlt />
        {showConfirm && (
          <div className="project-delete-modal">
            <div className="project-delete-modal__inner">
              <p>Are you sure you want delete this project?</p>
              <button type="button" onClick={() => deleteProject(project.docId)}>
                Delete
              </button>
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                onKeyDown={() => setShowConfirm(!showConfirm)}
                tabIndex={0}
                role="button">
                Cancel
              </span>
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
