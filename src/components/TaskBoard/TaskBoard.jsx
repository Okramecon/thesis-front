import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend }from "react-dnd-html5-backend";
import Column from "./Column/Column";
import CustomDragLayer from "./CustomDragLayer/CustomDragLayer";
import ThesisAPIService from "API/ThesisAPI";
import AlertSeverities from "helpers/AlertSeverities";
import { AppContext } from "App";
import { Box } from "@mui/material";
import cl from "./TaskBoard.module.css"

const TaskBoard = ({tasks}) => {
  const [myTasks, moveMyTask] = useState(tasks);
  useEffect(() => { moveMyTask(tasks)}, [tasks] )
  const setAlertState = useContext(AppContext);

  const handleMoveMyTask = (from, to) => {
    const { task, columnIndex: fromColumnIndex, index } = from;
    const { columnIndex: toColumnIndex } = to;
    const newMyTasks = [...myTasks];

    ThesisAPIService.UpdateTask({ ...task, status: toColumnIndex })
    .then(response => {
      if(response.ok) {
        task.status = toColumnIndex
        setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.success})
        // remove task
        newMyTasks[fromColumnIndex].tasks.splice(index, 1);
        // move task
        newMyTasks[toColumnIndex].tasks.push(task);
        moveMyTask(newMyTasks);
        return;
      }
      setAlertState({ alertOpen: true, message: response.message, severity: AlertSeverities.error})
    })
  };

  const columns = myTasks.map((tasks, columnIndex) => {
    const propsToColumn = { tasks, columnIndex, handleMoveMyTask };
    return <Column key={`column ${columnIndex}`} {...propsToColumn} />;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <Box className={cl.taskBoard}>
        {columns}
      </Box>
    </DndProvider>
  );
};

export default TaskBoard;
