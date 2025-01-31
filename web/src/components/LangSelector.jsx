import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Text } from 'preact-i18n';

export default function LangSelector({ changeLanguage }) {
  const [language, setLanguage] = React.useState('ja');
  // eslint-disable-next-line no-unused-vars

  const handleChange = (event) => {
    setLanguage(event.target.value);
    changeLanguage(event.target.value);
  };

  return (
    <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">{<Text id="header.langselector" />}</InputLabel>
        <Select value={language} label={<Text id="header.langselector" />} onChange={handleChange}>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'ja'}>日本語</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
