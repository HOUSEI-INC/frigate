import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const SnapshotSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleMainSwitchChange = (event) => {
    const newState = { ...data, enabled: event.target.checked };
    if (!event.target.checked) {
      newState.clean_copy = true;
      newState.timestamp = false;
      newState.retain_days = 10;
      newState.height = 175;
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetSnapshotSwitch: () => {
      setData({
        enabled: false,
        clean_copy: true,
        timestamp: false,
        retain_days: 10,
        height: 175,
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
        control={<Switch checked={data.enabled} onChange={handleMainSwitchChange} color="primary" />}
        label="enabled"
      />
      <br />
      {data.enabled && (
        <>
          <FormControlLabel
            control={<Switch checked={data.clean_copy} onChange={handleSwitchChange('clean_copy')} color="primary" />}
            label="clean_copy"
          />
          <br />
          <FormControlLabel
            control={<Switch checked={data.timestamp} onChange={handleSwitchChange('timestamp')} color="primary" />}
            label="timestamp"
          />
          <br />
          <TextField
            label="Input Field"
            variant="outlined"
            value={data.retain_days}
            type="number"
            onChange={handleInputChange('retain_days')}
          />
          <br />
          <TextField
            label="Input Field"
            variant="outlined"
            value={data.height}
            type="number"
            onChange={handleInputChange('height')}
          />
          <br />
        </>
      )}
    </div>
  );
});

export default SnapshotSettingsTab;
