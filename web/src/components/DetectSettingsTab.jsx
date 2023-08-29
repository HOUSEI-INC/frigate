import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const DetectSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    const newState = { ...data, enabled: event.target.checked };
    if (!event.target.checked) {
      newState.width = '';
      newState.height = '';
      newState.fps = '';
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetDetectSwitch: () => {
      setData({
        enabled: false,
        width: '',
        height: '',
        fps: '',
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
      {data.enabled && (
        <>
          <TextField
            label="输入文本 1"
            variant="outlined"
            value={data.width}
            onChange={handleInputChange('width')}
            type="number"
          />
          <TextField
            label="输入文本 2"
            variant="outlined"
            value={data.height}
            onChange={handleInputChange('height')}
            type="number"
          />
          <TextField
            label="输入文本 3"
            variant="outlined"
            value={data.fps}
            onChange={handleInputChange('fps')}
            type="number"
          />
        </>
      )}
    </div>
  );
});

export default DetectSettingsTab;
