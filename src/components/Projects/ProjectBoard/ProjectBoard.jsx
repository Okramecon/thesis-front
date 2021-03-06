import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate, useParams} from "react-router-dom";
import ThesisAPIService from "../../../API/ThesisAPI";
import {TaskStatusEnum} from "../../../helpers/EnumHelpers";
import TaskBoard from "../../TaskBoard/TaskBoard";
import CreateTicketModal from "../../Ticket/CreateTicketModal";

const ProjectBoard = props => {
  const [tickets, setTickets] = useState([]);
  const [board, setBoard] = useState();
  const isMounted = useRef(true);
  const navigate = useNavigate()
  
  const fetchTasks = () =>  {
    ThesisAPIService.getTasksByProjectId(props.projectId)
      .then(response => {
        if(response.ok) {
          if (isMounted.current)
            setTickets(response.data)
        } else {
          navigate('/departments')
        }
      })
  }

  const fetchBoard = () =>  {
    ThesisAPIService.getBoardByProjectId(props.projectId)
        .then(response => {
          if(response.ok) {
            setBoard(response.data)
          } else {
            navigate('/departments')
          }
        })
  }

  useEffect(() => {
    fetchBoard();
  }, [])

  useEffect(() => {
    fetchTasks();
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
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
};

ProjectBoard.propTypes = {
  projectId: PropTypes.number
};

export default ProjectBoard;