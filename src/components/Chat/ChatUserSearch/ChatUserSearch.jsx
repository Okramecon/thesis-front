import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {Divider} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ThesisAPIService from "../../../API/ThesisAPI";
import cl from "./ChatUserSearch.module.css";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  border: "1px solid lightGray",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.0),
  },
  marginLeft: 0,
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: 'auto'
  },
}));

const StyledListItemText = styled(ListItemText)(() => ({
  whiteSpace: "nowrap",
  width: "100%",
  fontSize: "10px",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const StyledList = styled(ListItemText)(() => ({
  marginTop: "10px",
  padding: "5px 10px",
  width: "100%",
  height: "auto",
  color: "gray",
  maxHeight: "40vh",
  overflowY: "auto",
  borderRadius:"5px"
}));

const ChatUserSearch = props => {
  const [searchMatchString, setSearchMatchString] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
    if (searchMatchString === "") return;
    ThesisAPIService.searchUsers(searchMatchString)
        .then(response => {
          setUsers(response.data);
        })
  }, [searchMatchString]);

  const initNewChatRoom = user => {
    return {
      id: null,
      name: "",
      users: [
        {
          userId: user.userId,
          user: user
        }
      ],
      chatMessages: []
    }
  }

  const handleUserClick = user => {
    ThesisAPIService
        .getCommonChatRoom(user.id)
        .then(response => {
          if(response.ok) {
            props.selectChatRoom(response.data)
          }
          else {
            props.selectChatRoom(initNewChatRoom(user))
          }
          setSearchMatchString('');
        });
  }

  return (
      <div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
              value={searchMatchString}
              onChange={(e) => setSearchMatchString(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {users.length > 0 &&
        <div>
          <StyledList>
            {users.map((user) => (
                <div key={user.id}>
                  <ListItemButton
                      sx={{height: "40px", width: "100%"}}
                      onClick={() => handleUserClick(user)}>
                    <StyledListItemText primary={`${user.firstName} ${user.lastName} (${user.userName})`}/>
                  </ListItemButton>
                </div>
            ))}
          </StyledList>
          <Divider/>
        </div>
        }
      </div>
  );
};

ChatUserSearch.propTypes = {
  selectChatRoom: PropTypes.func
};

export default ChatUserSearch;