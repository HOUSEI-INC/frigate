/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SettingTabs from './SettingTabs';
import axios from 'axios';
import { Text } from 'preact-i18n';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');
  const [name, setName] = useState('');

  const [streamError, setStreamError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [settingsData, setSettingsData] = useState({});

  const handleSettingsData = (data) => {
    setSettingsData(data);
  };

  const handleClose = () => {
    setOpen(false);
    setStreamUrl('');
    setName('');
    setStreamError(false);
    setNameError(false);
  };

  const handleIpChange = (event) => {
    const value = event.target.value;
    setStreamUrl(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const [configData, setCongifData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();

    const isIpInvalid = streamUrl === '';
    const isNameInvalid = name === '';

    setStreamError(isIpInvalid);
    setNameError(isNameInvalid);

    if (!isIpInvalid && !isNameInvalid) {
      console.log('stream:', streamUrl);
      console.log('Camera Name:', name);
      //发送给后端API等。
      console.log(settingsData);
      const camPath = 'rtsp://' + streamUrl;

      let data = {};
      if (Object.keys(settingsData).length !== 0) {
        data = {
          cameras: {
            [name]: {
              ffmpeg: {
                inputs: [
                  {
                    path: camPath,
                  },
                ],
              },
              birdseye: {
                enabled: settingsData.birdEyeData.enabled,
                mode: settingsData.birdEyeData.mode,
              },
              detect: {
                enabled: settingsData.detectData.enabled,
                width: settingsData.detectData.width,
                height: settingsData.detectData.height,
                fps: settingsData.detectData.fps,
                max_disappeared:settingsData.detectData.max_disappeared,
              },
              record: {
                enabled: settingsData.recordingData.enabled,
                retain: {
                  days: settingsData.recordingData.record_retain_days,
                  mode: settingsData.recordingData.record_retain_model,
                },
                events: {
                  post_capture: settingsData.recordingData.event_post_capture,
                  pre_capture: settingsData.recordingData.event_pre_capture,
                  retain: {
                    default: settingsData.recordingData.event_retain_days,
                    mode: settingsData.recordingData.event_retain_model,
                  },
                },
              },
              snapshots: {
                clean_copy: settingsData.snapshotData.clean_copy,
                enabled: settingsData.snapshotData.enabled,
                height: settingsData.snapshotData.height,
                retain: {
                  default: settingsData.snapshotData.retain_days,
                },
                timestamp: settingsData.snapshotData.timestamp,
              },
            },
          },
        };
      } else {
        data = {
          cameras: {
            [name]: {
              ffmpeg: {
                inputs: [
                  {
                    path: camPath,
                  },
                ],
              },
            },
          },
        };
      }
      console.log(data);
      addNewCam(data);
      setCongifData(data);
      console.log(configData);
      handleClose();
    }
  };

  const [success, setSuccess] = useState();

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();

  const addNewCam = async (partial_config) => {
    try {
      const response = await axios.post(`config/cameras/add?save_option=restart`, partial_config, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setSuccess(response.data);
        console.log(success);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        {<Text id="cameras.add_new.btn" />}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {/* add new */}
          <Text id="cameras.add_new.title" />
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              {/* add a new camera */}
              <Text id="cameras.add_new.contentTxt" />
            </DialogContentText>
            <TextField
              margin="dense"
              id="camera-name"
              label={<Text id="cameras.add_new.camname_textfield" />}
              fullWidth
              variant="standard"
              required
              value={name}
              onChange={handleNameChange}
              error={nameError}
              helperText={nameError ? 'Name format is wrong' : ''}
            />
            <TextField
              margin="dense"
              label={<Text id="cameras.add_new.camstream_textfield" />}
              fullWidth
              variant="standard"
              required
              value={streamUrl}
              onChange={handleIpChange}
              error={streamError}
              helperText={streamError ? 'stream format is wrong' : ''}
            />
            <SettingTabs onReceiveData={handleSettingsData} />
            <DialogActions>
              <Button onClick={handleClose}> {<Text id="cameras.add_new.cancel_btn" />}</Button>
              <Button variant="contained" color="primary" type="submit" disabled={streamUrl === '' || name === ''}>
                {<Text id="cameras.add_new.save_btn" />}
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
