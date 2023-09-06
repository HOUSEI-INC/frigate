import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const RecordingSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    if (!event.target.checked) {
      setData({
        enabled: false,
        record_retain_days: 0,
        record_retain_model: 'all',
        event_pre_capture: 5,
        event_post_capture: 5,
        event_retain_days: 10,
        event_retain_model: 'all',
      });
    } else {
      setData((prev) => ({ ...prev, enabled: true }));
    }
  };

  useImperativeHandle(ref, () => ({
    resetSwitch: () => {
      setData({
        enabled: false,
        record_retain_days: 0,
        record_retain_model: 'all',
        event_pre_capture: 5,
        event_post_capture: 5,
        event_retain_days: 10,
        event_retain_model: 'all',
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
            label="record_retain_days"
            variant="outlined"
            value={data.record_retain_days}
            type="number"
            onChange={handleInputChange('record_retain_days')}
          />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">record_retain_model</FormLabel>
            <RadioGroup row value={data.record_retain_model} onChange={handleInputChange('record_retain_model')}>
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="motion" control={<Radio />} label="motion" />
              <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            label="event_pre_capture"
            variant="outlined"
            value={data.event_pre_capture}
            type="number"
            onChange={handleInputChange('event_pre_capture')}
          />
          <br />
          <TextField
            label="event_post_capture"
            variant="outlined"
            value={data.event_post_capture}
            type="number"
            onChange={handleInputChange('event_post_capture')}
          />
          <br />
          <TextField
            label="event_retain_days"
            variant="outlined"
            value={data.event_retain_days}
            type="number"
            onChange={handleInputChange('event_retain_days')}
          />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">event_retain_model</FormLabel>
            <RadioGroup row value={data.event_retain_model} onChange={handleInputChange('event_retain_model')}>
              <FormControlLabel value="all" control={<Radio />} label="all" />
              <FormControlLabel value="motion" control={<Radio />} label="motion" />
              <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
            </RadioGroup>
          </FormControl>
          <br />
        </>
      )}
    </div>
  );
});

export default RecordingSettingsTab;
