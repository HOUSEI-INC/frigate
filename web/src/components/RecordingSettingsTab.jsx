import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const RecordingSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    if (!event.target.checked) {
      setData({
        enabled: false,
        record_retain_days: '',
        record_retain_model: '',
        event_pre_capture: '',
        event_post_capture: '',
        event_retain_days: '',
        event_retain_model: '',
      });
    } else {
      setData((prev) => ({ ...prev, enabled: true }));
    }
  };

  useImperativeHandle(ref, () => ({
    resetSwitch: () => {
      setData({
        enabled: false,
        record_retain_days: '',
        record_retain_model: '',
        event_pre_capture: '',
        event_post_capture: '',
        event_retain_days: '',
        event_retain_model: '',
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
            label="输入文本"
            variant="outlined"
            value={data.record_retain_days}
            type="number"
            onChange={handleInputChange('record_retain_days')}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">选择项</FormLabel>
            <RadioGroup row value={data.record_retain_model} onChange={handleInputChange('record_retain_model')}>
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="motion" control={<Radio />} label="motion" />
              <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
            </RadioGroup>
          </FormControl>
          <TextField
            label="输入文本 1"
            variant="outlined"
            value={data.event_pre_capture}
            type="number"
            onChange={handleInputChange('event_pre_capture')}
          />
          <TextField
            label="输入文本 2"
            variant="outlined"
            value={data.event_post_capture}
            type="number"
            onChange={handleInputChange('event_post_capture')}
          />
          <TextField
            label="输入文本 3"
            variant="outlined"
            value={data.event_retain_days}
            type="number"
            onChange={handleInputChange('event_retain_days')}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">选择项2</FormLabel>
            <RadioGroup row value={data.event_retain_model} onChange={handleInputChange('event_retain_model')}>
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="motion" control={<Radio />} label="motion" />
              <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
            </RadioGroup>
          </FormControl>
        </>
      )}
    </div>
  );
});

export default RecordingSettingsTab;
