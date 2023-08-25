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
import { Switch, TextField, FormControlLabel, Checkbox } from '@mui/material';
import DetectSettingsTab from './DetectSettingsTab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SettingTabs() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('1');

  const [tab1Data, setTab1Data] = React.useState({});

  const tab1Ref = React.useRef(null);

  const [tabsState, setTabsState] = React.useState({
    tab1: { switch: false, text: '' },
    tab2: { switch: false, text: '' },
    tab3: { switch: false, checkbox: false },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSwitchChange = (tab) => (event) => {
    const newState = {
      ...tabsState,
      [tab]: {
        ...tabsState[tab],
        switch: event.target.checked,
      },
    };
    if (!event.target.checked) {
      newState[tab] = { ...newState[tab], text: tab === 'tab3' ? false : '' };
    }
    setTabsState(newState);
  };

  const handleInputChange = (tab) => (event) => {
    setTabsState({
      ...tabsState,
      [tab]: {
        ...tabsState[tab],
        text: event.target.value,
      },
    });
  };

  const handleCheckboxChange = (tab) => (event) => {
    setTabsState({
      ...tabsState,
      [tab]: {
        ...tabsState[tab],
        checkbox: event.target.checked,
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset the state
    setTabsState({
      tab1: { switch: false, text: '' },
      tab2: { switch: false, text: '' },
      tab3: { switch: false, checkbox: false },
    });
  };

  const handleSubmit = () => {
    console.log('Tab 1 Data:', tab1Data);
    console.log(tabsState);
    tab1Ref.current.resetSwitch();
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
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogContent>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Item One" value="1" />
                  <Tab label="Item Two" value="2" />
                  <Tab label="Item Three" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <DetectSettingsTab ref={tab1Ref} onTabDataChange={(data) => setTab1Data(data)} />
              </TabPanel>
              <TabPanel value="2">
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabsState.tab2.switch}
                        onChange={handleSwitchChange('tab2')}
                        name="showTextFieldSwitchTab2"
                        color="primary"
                      />
                    }
                    label="显示文本框 Tab 2"
                  />
                  {tabsState.tab2.switch && (
                    <TextField
                      id="outlined-basic-tab2"
                      label="输入文本 Tab 2"
                      variant="outlined"
                      value={tabsState.tab2.text}
                      onChange={handleInputChange('tab2')}
                    />
                  )}
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabsState.tab3.switch}
                        onChange={handleSwitchChange('tab3')}
                        name="showCheckboxSwitchTab3"
                        color="primary"
                      />
                    }
                    label="显示选择框 Tab 3"
                  />
                  {tabsState.tab3.switch && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tabsState.tab3.checkbox}
                          onChange={handleCheckboxChange('tab3')}
                          name="checkboxTab3"
                        />
                      }
                      label="选择框"
                    />
                  )}
                </Box>
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
