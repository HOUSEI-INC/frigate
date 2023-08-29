import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const SnapshotSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleMainSwitchChange = (event) => {
    const newState = { ...data, mainSwitchState: event.target.checked };
    if (!event.target.checked) {
      newState.switch1 = true;
      newState.switch2 = false;
      newState.textField = '';
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetSnapshotSwitch: () => {
      setData({
        mainSwitchState: false,
        switch1: true,
        switch2: false,
        textField: '',
      });
    },
  }));

  const handleInputChange = (field) => (event) => {
    setData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSwitchChange = (field) => (event) => {
    setData((prev) => ({ ...prev, [field]: event.target.checked }));
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={data.mainSwitchState} onChange={handleMainSwitchChange} color="primary" />}
        label="Main Switch"
      />
      {data.mainSwitchState && (
        <>
          <FormControlLabel
            control={<Switch checked={data.switch1} onChange={handleSwitchChange('switch1')} color="primary" />}
            label="Switch 1"
          />
          <FormControlLabel
            control={<Switch checked={data.switch2} onChange={handleSwitchChange('switch2')} color="primary" />}
            label="Switch 2"
          />
          <TextField
            label="Input Field"
            variant="outlined"
            value={data.textField}
            onChange={handleInputChange('textField')}
          />
        </>
      )}
    </div>
  );
});

export default SnapshotSettingsTab;
