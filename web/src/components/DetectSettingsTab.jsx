import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const DetectSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    const newState = { ...data, switchState: event.target.checked };
    if (!event.target.checked) {
      newState.text1 = '';
      newState.text2 = '';
      newState.text3 = '';
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetDetectSwitch: () => {
      setData({
        switchState: false,
        text1: '',
        text2: '',
        text3: '',
      });
    },
  }));

  const handleInputChange = (field) => (event) => {
    setData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={data.switchState} onChange={handleSwitchChange} color="primary" />}
        label="Enable"
      />
      {data.switchState && (
        <>
          <TextField label="输入文本 1" variant="outlined" value={data.text1} onChange={handleInputChange('text1')} />
          <TextField label="输入文本 2" variant="outlined" value={data.text2} onChange={handleInputChange('text2')} />
          <TextField label="输入文本 3" variant="outlined" value={data.text3} onChange={handleInputChange('text3')} />
        </>
      )}
    </div>
  );
});

export default DetectSettingsTab;
