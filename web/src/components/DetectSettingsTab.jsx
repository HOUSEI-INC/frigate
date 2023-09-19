import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';
import { Text } from 'preact-i18n';

const DetectSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    const newState = { ...data, enabled: event.target.checked };
    if (!event.target.checked) {
      newState.width = 1280;
      newState.height = 720;
      newState.fps = 5;
      newState.max_disappeared = 25;
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
        max_disappeared:25,
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
        label={<Text id="more_settings.Detect.enable" />}
      />
      <br />
      {data.enabled && (
        <>
          <TextField
            label={<Text id="more_settings.Detect.width" />}
            variant="outlined"
            value={data.width}
            onChange={handleInputChange('width')}
            type="number"
          />
          <br />
          <TextField
            label={<Text id="more_settings.Detect.height" />}
            variant="outlined"
            value={data.height}
            onChange={handleInputChange('height')}
            type="number"
          />
          <br />
          <TextField
            label={<Text id="more_settings.Detect.fps" />}
            variant="outlined"
            value={data.fps}
            onChange={handleInputChange('fps')}
            type="number"
          />
          <br />
          <TextField
            label='max_disappeared'
            variant="outlined"
            value={data.max_disappeared}
            onChange={handleInputChange('max_disappeared')}
            type="number"
          />
        </>
      )}
    </div>
  );
});

export default DetectSettingsTab;
