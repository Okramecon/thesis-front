import ThesisAPIService from 'API/ThesisAPI';
import TaskBoard from 'components/TaskBoard/TaskBoard';
import CreateTicketModal from 'components/Ticket/CreateTicketModal';
import { TaskStatusEnum } from 'helpers/EnumHelpers';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function TaskBoardPage() {
  const params = useParams();
  const [tickets, setTickets] = useState([])
  const [board, setBoard] = useState()

  const fetchTasks = () =>  {
    ThesisAPIService.getTasksByProjectId(params.projectId)
    .then(response => {
      setTickets(response.data)
    })
  }

  const fetchBoard = () =>  {
    ThesisAPIService.getBoardByProjectId(params.projectId)
    .then(response => {
      setBoard(response.data)
    })
  }

  useEffect(() => {
    fetchTasks()
    fetchBoard()
  }, [])

  const columnsIds = [0, 1, 2]
  let filteredTasks = []

  const boardId = board?.id
 
  columnsIds.forEach(id => {
    const tasks = tickets.filter(e => e.status === id) ?? [];
    filteredTasks.push({
      title: `${TaskStatusEnum[id]}`,
      tasks: tasks
    })
  })

  return (
    <React.Fragment>
      <TaskBoard tasks={filteredTasks} />
      <CreateTicketModal fetchTickets={fetchTasks} boardId={boardId}/>
    </React.Fragment>
  )
}

export default TaskBoardPage