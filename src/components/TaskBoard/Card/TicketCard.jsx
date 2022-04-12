import TicketDetailModal from "components/Ticket/TicketDetailModal";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./Card.styles.scss";

const TicketCard = (props) => {

    const [open, setOpen] = useState(false)

    const openDetails = () => {
        setOpen(true);
    }

    const date = new Date(Date.parse(props.task.createdDatetime));

    return (
        <React.Fragment>
            <div className={`card ` + (props.empty ? "card--empty" : "") + (props.drag ? "card--drag" : "")}
                 onClick={() => openDetails()}
            >
                <div className="title">{props.task.title}</div>
                <div className="date">{date.toLocaleDateString()}</div>
                <div className="time">{date.getHours()}:{date.getMinutes()}</div>
            </div>
            <TicketDetailModal task={props.task} open={open} handleClose={() => setOpen(false)}/>
      </React.Fragment>)
};

TicketCard.propTypes = {
    task: PropTypes.object,
    empty: PropTypes.bool,
    drag: PropTypes.bool
}

export default TicketCard;