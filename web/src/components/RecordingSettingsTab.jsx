import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const RecordingSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    if (!event.target.checked) {
      setData({
        switchState: false,
        text: '',
        radioValue: '',
        text1: '',
        text2: '',
        text3: '',
      });
    } else {
      setData((prev) => ({ ...prev, switchState: true }));
    }
  };

  useImperativeHandle(ref, () => ({
    resetSwitch: () => {
      setData({
        switchState: false,
        text: '',
        radioValue: '',
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
          <TextField label="输入文本" variant="outlined" value={data.text} onChange={handleInputChange('text')} />
          <FormControl component="fieldset">
            <FormLabel component="legend">选择项</FormLabel>
            <RadioGroup row value={data.radioValue} onChange={handleInputChange('radioValue')}>
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
              <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
            </RadioGroup>
          </FormControl>
          <TextField label="输入文本 1" variant="outlined" value={data.text1} onChange={handleInputChange('text1')} />
          <TextField label="输入文本 2" variant="outlined" value={data.text2} onChange={handleInputChange('text2')} />
          <TextField label="输入文本 3" variant="outlined" value={data.text3} onChange={handleInputChange('text3')} />
        </>
      )}
    </div>
  );
});

export default RecordingSettingsTab;
