/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SettingTabs from './SettingTabs';

const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [name, setName] = useState('');

  const [ipError, setIpError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIpAddress('');
    setName('');
    setIpError(false);
    setNameError(false);
  };

  const handleIpChange = (event) => {
    const value = event.target.value;
    setIpAddress(value);

    if (ipRegex.test(value)) {
      // 如果输入的 IP 地址格式正确，则取消错误提示
      setIpError(false);
    } else {
      // 否则，显示错误提示
      setIpError(true);
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isIpInvalid = !ipRegex.test(ipAddress);
    const isNameInvalid = name === '';

    setIpError(isIpInvalid);
    setNameError(isNameInvalid);

    if (!isIpInvalid && !isNameInvalid) {
      console.log('IP Address:', ipAddress);
      console.log('Camera Name:', name);
      // 在这里，你可以进一步处理表单的提交逻辑，例如发送给后端API等。
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        add new
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>add new</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>add a new camera</DialogContentText>
            <TextField
              margin="dense"
              id="camera-name"
              label="Camera Name"
              fullWidth
              variant="standard"
              required
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
            <TextField
              margin="dense"
              id="camera-ipaddress"
              label="Camera IP Address"
              fullWidth
              variant="standard"
              required
              value={ipAddress}
              onChange={handleIpChange}
              error={ipError}
              helperText={ipError ? 'IP format is wrong' : ''}
            />
            <SettingTabs />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit" disabled={ipAddress === '' || name === ''}>
                REGISTER
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
