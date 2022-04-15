import ThesisAPIService from 'API/ThesisAPI';
import TaskBoard from 'components/TaskBoard/TaskBoard';
import { TaskStatusEnum } from 'helpers/EnumHelpers';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function TaskBoardPage() {
  const params = useParams();
  const [tickets, settickets] = useState([])

  const fetchTasks = () =>  {
    ThesisAPIService.getTasksByProjectId(params.projectId)
    .then(response => {
      settickets(response.data)
    })
  }
  
  useEffect(() => {
    fetchTasks()
  }, [])

  const columnsIds = [0, 1, 2]
  let filteredTasks = []
 
  columnsIds.map(id => {
    const tasks = tickets.filter(e => e.status === id) ?? [];
    filteredTasks.push({
      title: `${TaskStatusEnum[id]}`,
      tasks: tasks
    })
  })

  return (
    <React.Fragment>
      <TaskBoard tasks={filteredTasks} />
    </React.Fragment>
  )
}

export default TaskBoardPage