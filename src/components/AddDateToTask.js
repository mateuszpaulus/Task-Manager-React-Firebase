import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaSpaceShuttle, FaRegFlag, FaRegHourglass } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTasksContext } from '../context/tasks-context';

export const AddDateToTask = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  const { showQuickAddTask } = useTasksContext();

  return (
    showTaskDate && (
      <div
        className={showQuickAddTask ? 'task-date task-date__quick' : 'task-date'}
        data-testid="add-date-task-test">
        <ul className="task-date__list">
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate('');
                }
              }}
              tabIndex={0}
              role="button"
              data-testid="add-date-inprogress">
              <span>
                <FaSpaceShuttle />
              </span>
              <span>InProgress</span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(2, 'days').format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(2, 'days').format('DD/MM/YYYY'));
                }
              }}
              tabIndex={0}
              role="button"
              data-testid="add-date-tomorrow">
              <span>
                <FaRegHourglass />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                }
              }}
              role="button"
              tabIndex={0}
              data-testid="add-date-onlyweek">
              <span>
                <FaRegFlag />
              </span>
              <span>OnlyWeek</span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'months').format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, 'months').format('DD/MM/YYYY'));
                }
              }}
              role="button"
              tabIndex={0}
              data-testid="tadd-date-thismonth">
              <span>
                <FaRegPaperPlane />
              </span>
              <span>ThisMonth</span>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

AddDateToTask.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired
};
