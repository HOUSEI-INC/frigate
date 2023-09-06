import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const DetectSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    const newState = { ...data, enabled: event.target.checked };
    if (!event.target.checked) {
      newState.width = 1280;
      newState.height = 720;
      newState.fps = 5;
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetDetectSwitch: () => {
      setData({
        enabled: false,
        width: 1280,
        height: 720,
        fps: 5,
      });
    },
  }));

  const handleInputChange = (field) => (event) => {
    setData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={data.enabled} onChange={handleSwitchChange} color="primary" />}
        label="Enable"
      />
      <br />
      {data.enabled && (
        <>
          <TextField
            label="width"
            variant="outlined"
            value={data.width}
            onChange={handleInputChange('width')}
            type="number"
          />
          <br />
          <TextField
            label="height"
            variant="outlined"
            value={data.height}
            onChange={handleInputChange('height')}
            type="number"
          />
          <br />
          <TextField
            label="fps"
            variant="outlined"
            value={data.fps}
            onChange={handleInputChange('fps')}
            type="number"
          />
          <br />
        </>
      )}
    </div>
  );
});

export default DetectSettingsTab;