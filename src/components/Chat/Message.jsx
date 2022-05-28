import PropTypes from 'prop-types';
import cl from "./Chat.module.css";

const Message = props => {
  const rootClasses = [cl.messageContainer];

  if (localStorage.getItem("username") === props.user) {
    rootClasses.push(cl.myMessage);
  }

  return (
        <div style={{display:"flex"}}>
          <span className={rootClasses.join(' ')}>
            {props.message}
          </span>
        </div>
  );
};

Message.propTypes = {
  user: PropTypes.string,
  message: PropTypes.string
};

export default Message;