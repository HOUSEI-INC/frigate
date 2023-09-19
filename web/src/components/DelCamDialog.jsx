/* eslint-disable no-console */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Text } from 'preact-i18n';

const deleteCamera = (close, cam_name) => async () => {
  try {
    const response = await axios.post(
      `config/cameras/delete?save_option=restart`,
      {
        cameras: [cam_name],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    if (response.status === 200) {
      console.log('delete success');
    }
  } catch (error) {
    console.log('delete failed');
  }
  close();
};

export default function DelCamDialog({ open, handleClose, name }) {
  const onDelete = deleteCamera(handleClose, name);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{'Check'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Text id="cameras.delcam_contentTxt">{`Are you sure to delete the camera that named ${name}?`}</Text>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDelete}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
