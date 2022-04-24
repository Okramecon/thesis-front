import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import ThesisAPI from "../API/ThesisAPI";
import AllChats from "../components/Chat/AllChats";

const ChatsPage = props => {

  const [connection, setConnection] = useState(null);
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const newConnection = ThesisAPI.getNewChatConnection();
    setConnection(newConnection);
  }, []);

  return (
      <React.Fragment>
          <AllChats connection={connection}/>
      </React.Fragment>
  );
};

ChatsPage.propTypes = {

};

export default ChatsPage;