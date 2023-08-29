/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import SettingTabs from './SettingTabs';
import axios from 'axios';

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

  const [settingsData, setSettingsData] = useState({});

  const handleSettingsData = (data) => {
    setSettingsData(data);
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

  const [configData, setCongifData] = useState({});
  const handleSubmit = (event) => {
    event.preventDefault();

    const isIpInvalid = !ipRegex.test(ipAddress);
    const isNameInvalid = name === '';

    setIpError(isIpInvalid);
    setNameError(isNameInvalid);

    if (!isIpInvalid && !isNameInvalid) {
      console.log('IP Address:', ipAddress);
      console.log('Camera Name:', name);
      //发送给后端API等。
      console.log(settingsData);

      const camPath = 'rtsp://' + ipAddress + ':554';
      const data = {
        [name]: {
          ffmpeg: {
            inputs: [
              {
                path: camPath,
              },
            ],
          },
          detect: {
            enabled: settingsData.detectData.enabled,
            width: settingsData.detectData.width,
            height: settingsData.detectData.height,
            fps: settingsData.detectData.fps,
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
      };
      console.log(data);
      setCongifData(data);
      handleClose();
    }
  };

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const onHandleAddNewCam = async (e, partial_config) => {
    if (e) {
      e.stopPropagation();
    }

    axios
      .post(`config/partial/save?save_option=restart`, partial_config)
      .then((response) => {
        if (response.status === 200) {
          console.log(success);
          setSuccess(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError(error.message);
        }
      });
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
            <SettingTabs onReceiveData={handleSettingsData} />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={ipAddress === '' || name === ''}
                onClick={(e) => onHandleAddNewCam(e, configData)}
              >
                REGISTER
              </Button>
            </DialogActions>
            {error && <div className="p-4 overflow-scroll text-red-500 whitespace-pre-wrap">{error}</div>}
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
