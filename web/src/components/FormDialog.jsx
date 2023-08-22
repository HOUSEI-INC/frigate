import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [cameraIpAddress, setCameraIpAddress] = React.useState('');
  const [cameraName, setCameraName] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (cameraIpAddress.trim() === '' || cameraName.trim() === '') {
      setError(true);
    } else {
      setError(false);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        add new
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>add new</DialogTitle>
        <DialogContent>
          <DialogContentText>add a new camera</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="camera-ipaddress"
            label="カメラIPアドレス"
            fullWidth
            variant="standard"
            required
            value={cameraIpAddress}
            onChange={(event) => setCameraIpAddress(event.target.value)}
            className={error && cameraIpAddress.trim() === '' ? 'error' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="camera-name"
            label="カメラ名"
            fullWidth
            variant="standard"
            required
            value={cameraName}
            onChange={(event) => setCameraName(event.target.value)}
            className={error && cameraName.trim() === '' ? 'error' : ''}
          />
          {error && <p style={{ color: 'red' }}>Please fill in all required fields.</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>save</Button>
        </DialogActions>
      </Dialog>

      <style>
        {`
            .error {
              border: 2px solid red; // 设置红色边框
            }
          `}
      </style>
    </div>
  );
}
