import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

function TestPage() {
  const [status, setStatus] = React.useState('');
  const handelChange = (event) => {
    setStatus(event.target.value);

  }
  return (
    <div>
      <Fab aria-label="add"  sx={{ float: 'right', position: 'fixed', bottom: 40, right: 16, transform: 'translateZ(5px)' }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default TestPage