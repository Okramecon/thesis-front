import React from 'react';
import TextField from '@mui/material/TextField';

const AddDepartmentForm = props => {
    return (
        <form>
                    <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        </form>
    );
};

export default AddDepartmentForm;