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
import TabPanel from '@mui/lab/TabPanel';
import DetectSettingsTab from './DetectSettingsTab';
import RecordingSettingsTab from './RecordingSettingsTab';
import SnapshotSettingTab from './SnapshotSettingTab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingTabs() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('1');

  const detectSettingRef = React.useRef();
  const recordingSettingsRef = React.useRef();
  const snapshotSettingsRef = React.useRef();

  const [detectData, setDetectData] = React.useState({
    switchState: false,
    text1: '',
    text2: '',
    text3: '',
  });

  const [recordingData, setRecordingData] = React.useState({
    switchState: false,
    text: '',
    radioValue: '',
    text1: '',
    text2: '',
    text3: '',
  });

  const [snapshotData, setSnapshotData] = React.useState({
    mainSwitchState: false,
    switch1: true,
    switch2: false,
    textField: '',
  });

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
    setValue('1');
    setOpen(false);
  };

  const handleSubmit = () => {
    if (detectSettingRef.current) {
      detectSettingRef.current.resetDetectSwitch();
    }
    if (recordingSettingsRef.current) {
      recordingSettingsRef.current.resetSwitch();
    }
    if (snapshotSettingsRef.current) {
      snapshotSettingsRef.current.resetSnapshotSwitch();
    }
    console.log('detect Data:', detectData);
    console.log('Recording Data:', recordingData);
    console.log('snapshot Data:', snapshotData);
    setOpen(false);
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
              <TabPanel value="1">
                <DetectSettingsTab ref={detectSettingRef} data={detectData} setData={setDetectData} />
              </TabPanel>
              <TabPanel value="2">
                <RecordingSettingsTab ref={recordingSettingsRef} data={recordingData} setData={setRecordingData} />
              </TabPanel>
              <TabPanel value="3">
                <SnapshotSettingTab ref={snapshotSettingsRef} data={snapshotData} setData={setSnapshotData} />
              </TabPanel>
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
