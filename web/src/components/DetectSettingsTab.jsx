import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Switch, TextField, FormControlLabel } from '@mui/material';

const Tab1Component = forwardRef((props, ref) => {
  const { onTabDataChange } = props;

  const [switchState, setSwitchState] = useState(false);
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  useImperativeHandle(ref, () => ({
    resetSwitch: () => {
      setSwitchState(false);
    },
  }));

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
    if (!event.target.checked) {
      setText1('');
      setText2('');
      setText3('');
    }
    onTabDataChange({
      switchState: event.target.checked,
      text1: event.target.checked ? text1 : '',
      text2: event.target.checked ? text2 : '',
      text3: event.target.checked ? text3 : '',
    });
  };

  const handleTextChange1 = (event) => {
    setText1(event.target.value);
    onTabDataChange({ switchState, text1: event.target.value, text2, text3 });
  };

  const handleTextChange2 = (event) => {
    setText2(event.target.value);
    onTabDataChange({ switchState, text1, text2: event.target.value, text3 });
  };

  const handleTextChange3 = (event) => {
    setText3(event.target.value);
    onTabDataChange({ switchState, text1, text2, text3: event.target.value });
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={switchState} onChange={handleSwitchChange} color="primary" />}
        label="enable"
      />
      {switchState && (
        <>
          width:
          <TextField label="输入文本 1" variant="outlined" value={text1} onChange={handleTextChange1} />
          height:
          <TextField label="输入文本 2" variant="outlined" value={text2} onChange={handleTextChange2} />
          fps:
          <TextField label="输入文本 3" variant="outlined" value={text3} onChange={handleTextChange3} />
        </>
      )}
    </div>
  );
});

export default Tab1Component;
