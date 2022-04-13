import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function TestPage() {
  const [status, setStatus] = React.useState('');
  const handelChange = (event) => {
    setStatus(event.target.value);

  }
  return (
    <div>
      <FormControl standart>
        <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={handelChange}
            label="status"
            onChange={handelChange}
        >
          <MenuItem value={0}>New</MenuItem>
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TestPage