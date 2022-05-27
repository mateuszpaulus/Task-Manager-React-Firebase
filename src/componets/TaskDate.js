import React from 'react';
import moment from 'moment';
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa'

export const TaskDate = ({
    setTaskDate,
    showTaskDate,
    setShowTaskDate,
    showQuickAddTask
}) => {
    return ( 
        showTaskDate && (
            <div className={showQuickAddTask ? 'task-date task-date__quick' : 'task-date'} 
            data-testid="task-date-overlay">
                <ul className='task-date__list'>
                    <li
                        data-testid="task-date-nowadays"
                    >
                        <div
                            onClick={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().format('DD/MM/YYYY'))
                            }}
                            onKeyDown={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().format('DD/MM/YYYY'))
                            }}
                            tabIndex={0}
                            role="button"
                        >
                            <span>
                                <FaSpaceShuttle />
                            </span>
                            <span>Nowaday</span>
                        </div>
                    </li>
                    <li 
                        onClick={() => {
                            setShowTaskDate(false)
                            setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
                        }}
                        data-testid="task-date-tomorrow"
                    >
                        <div
                            onClick={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
                            }}
                            onKeyDown={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'))
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <span>
                                <FaSun />
                            </span>
                            <span>Tomorrow</span>
                        </div>
                    </li>
                    <li 
                        data-testid="task-date-next-week"
                    >
                        <div
                            onClick={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'))
                            }}
                            onKeyDown={() => {
                                setShowTaskDate(false)
                                setTaskDate(moment().add(7, 'day').format('DD/MM/YYYY'))
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <span>
                                <FaRegPaperPlane />
                            </span>
                            <span>Incoming</span>
                        </div>
                    </li>
    
    
                </ul>
            </div>
        )
    )
}