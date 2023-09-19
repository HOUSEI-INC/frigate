import React, { useImperativeHandle, forwardRef } from 'react';
import { Switch, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { Text } from 'preact-i18n';

const BirdEyeSettingsTab = forwardRef(({ data, setData }, ref) => {
  const handleSwitchChange = (event) => {
    const newState = { ...data, enabled: event.target.checked };
    if (!event.target.checked) {
      newState.mode = 'objects';
    }
    setData(newState);
  };

  useImperativeHandle(ref, () => ({
    resetBirdEyeSwitch: () => {
      setData({
        enabled: false,
        mode: 'objects',
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
        label={<Text id="more_settings.BirdEye.enable">Enable</Text>}
      />
      <br />
      {data.enabled && (
        <>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Text id="more_settings.BirdEye.mode.name">mode</Text>
            </FormLabel>
            <RadioGroup row value={data.mode} onChange={handleInputChange('mode')}>
              <FormControlLabel
                value="objects"
                control={<Radio />}
                label={<Text id="more_settings.BirdEye.mode.objects">objects</Text>}
              />
              <FormControlLabel
                value="motion"
                control={<Radio />}
                label={<Text id="more_settings.BirdEye.mode.motion">motion</Text>}
              />
              <FormControlLabel
                value="continuous"
                control={<Radio />}
                label={<Text id="more_settings.BirdEye.mode.continuous">continuous</Text>}
              />
            </RadioGroup>
          </FormControl>
          <br />
        </>
      )}
    </div>
  );
});

export default BirdEyeSettingsTab;
