import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState('');
  const [minDate,setMinDate]=React.useState("")

  const handleChange = (event) => {
    setAge(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  React.useEffect(()=>{
    const date=new Date().toLocaleDateString()
    // console.log(date)
    setMinDate(date)



  },[])



  return (
    <div>
      <Button onClick={handleClickOpen}  sx={{ backgroundColor:"blue" , color:"white" }}>{minDate ||"Set Due Date"}</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex',flexWrap: 'wrap' }}>
            <input type="datetime-local" min={minDate} value={minDate}  onChange={(e)=>setMinDate(minDate)}/>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
