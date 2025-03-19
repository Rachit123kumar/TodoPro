
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function SelectC({first="",second="",third="",name="",setVariable,variable=""}) {
  const [age, setAge] =useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    setVariable(event.target.value)
  };

  return (
    <div>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{name ||"Status"}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={variable || age}
          onChange={handleChange}
          label="Status"
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        > */}
        
          
         
          <MenuItem value={first|| "pending"}>{first|| "pending"}</MenuItem>
          <MenuItem value={second || "completed"}>{second || "completed"}</MenuItem>
          <MenuItem value={third || "in-progress"}>{third || "in-progress"}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
