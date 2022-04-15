import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend }from "react-dnd-html5-backend";
import "./TaskBoard.styles.scss";
import Column from "./Column/Column";
import CustomDragLayer from "./CustomDragLayer/CustomDragLayer";
import ThesisAPIService from "API/ThesisAPI";
import AlertSeverities from "helpers/AlertSeverities";
import { AppContext } from "App";

const TaskBoard = ({tasks}) => {
  const [myTasks, moveMyTask] = useState(tasks);
  useEffect(() => { moveMyTask(tasks)}, [tasks] )
  const setAlertState = useContext(AppContext);

  const handleMoveMyTask = (from, to) => {
    const { task, columnIndex: fromColumnIndex, index } = from;
    const { columnIndex: toColumnIndex } = to;

    const newMyTasks = [...myTasks];
    task.status = toColumnIndex;
    let response = UpdateTask(task);

    if (response === 0) {
      // remove task
      newMyTasks[fromColumnIndex].tasks.splice(index, 1);
      // move task
      newMyTasks[toColumnIndex].tasks.push(task);
      moveMyTask(newMyTasks);
    }
  };

  const UpdateTask = (task) => {
    ThesisAPIService.UpdateTask(task)
    .then(response => {
      if(response.ok) {
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.success})
        return 0;
      }
      setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})
      return -1;
    })
  }

  const columns = myTasks.map((tasks, columnIndex) => {
    const propsToColumn = { tasks, columnIndex, handleMoveMyTask };
    return <Column key={`column ${columnIndex}`} {...propsToColumn} />;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="task-board">
        {columns}
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
