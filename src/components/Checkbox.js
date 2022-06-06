import React from 'react';
import PropTypes from 'prop-types';
import { firebase } from '../firebase';

export const Checkbox = ({ id }) => {
  const archiveTask = () => {
    firebase.firestore().collection('tasks').doc(id).update({
      archived: true
    });
  };

  return (
    <div
      className="checkbox-archived"
      data-testid="checkbox-archived-test"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask();
      }}
      role="button"
      tabIndex={0}>
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired
};
