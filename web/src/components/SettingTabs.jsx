/* eslint-disable no-console */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import DetectSettingsTab from './DetectSettingsTab';
import RecordingSettingsTab from './RecordingSettingsTab';
import SnapshotSettingTab from './SnapshotSettingTab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingTabs({ onReceiveData }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('1');

  const detectSettingRef = React.useRef();
  const recordingSettingsRef = React.useRef();
  const snapshotSettingsRef = React.useRef();

  const [detectData, setDetectData] = React.useState({
    enabled: false,
    width: '',
    height: '',
    fps: '',
  });

  const [recordingData, setRecordingData] = React.useState({
    enabled: false,
    record_retain_days: '',
    record_retain_model: '',
    event_pre_capture: '',
    event_post_capture: '',
    event_retain_days: '',
    event_retain_model: '',
  });

  const [snapshotData, setSnapshotData] = React.useState({
    enabled: false,
    clean_copy: true,
    timestamp: false,
    retain_days: '',
    height: 175,
  });

  const initialDetectData = {
    enabled: false,
    width: '',
    height: '',
    fps: '',
  };

  const initialRecordingData = {
    enabled: false,
    record_retain_days: '',
    record_retain_model: '',
    event_pre_capture: '',
    event_post_capture: '',
    event_retain_days: '',
    event_retain_model: '',
  };

  const initialSnapshotData = {
    enabled: false,
    clean_copy: true,
    timestamp: false,
    retain_days: '',
    height: 175,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    if (detectSettingRef.current) {
      detectSettingRef.current.resetDetectSwitch();
    }
    if (recordingSettingsRef.current) {
      recordingSettingsRef.current.resetSwitch();
    }
    if (snapshotSettingsRef.current) {
      snapshotSettingsRef.current.resetSnapshotSwitch();
    }

    setDetectData(initialDetectData);
    setRecordingData(initialRecordingData);
    setSnapshotData(initialSnapshotData);
    setValue('1');
    setOpen(false);
  };

  const handleSubmit = () => {
    const allData = {
      detectData,
      recordingData,
      snapshotData,
    };

    onReceiveData(allData);
    handleClose();
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        more settings
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogContent>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Detect" value="1" />
                  <Tab label="Recording" value="2" />
                  <Tab label="Snapshot" value="3" />
                </TabList>
              </Box>
              {value === '1' && <DetectSettingsTab ref={detectSettingRef} data={detectData} setData={setDetectData} />}
              {value === '2' && (
                <RecordingSettingsTab ref={recordingSettingsRef} data={recordingData} setData={setRecordingData} />
              )}
              {value === '3' && (
                <SnapshotSettingTab ref={snapshotSettingsRef} data={snapshotData} setData={setSnapshotData} />
              )}
            </TabContext>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
