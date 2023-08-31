/* eslint-disable no-console */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ open, handleClose, name, config }) {
  console.log(name);
  console.log(config);
  const [state, setState] = React.useState({
    camChecked: false,
    detect: false,
    record: false,
    snapshot: false,
    cleanCopy: false,
    timestamp: false,
  });

  const handleChange = (key) => (event) => {
    setState({ ...state, [key]: event.target.checked });
  };
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {name} Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            camera enabled:
            <Switch
              checked={state.camChecked}
              onChange={handleChange('camChecked')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </ListItem>
          <Divider />
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Detect Settings" />
            <div style={{ width: '98%', alignSelf: 'center' }}>
              detect enabled:
              <Switch
                checked={state.detect}
                onChange={handleChange('detect')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <br />
              width:
              <TextField size="small" />
              height:
              <TextField size="small" />
              fps:
              <TextField size="small" />
            </div>
          </ListItem>
          <Divider />
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Record Settings" />
            <div style={{ width: '98%', alignSelf: 'center' }}>
              record enabled:
              <Switch
                checked={state.record}
                onChange={handleChange('record')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <br />
              <TextField label="输入文本" variant="outlined" type="number" size="small" />
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">选择项</FormLabel>
                <RadioGroup row>
                  <FormControlLabel value="all" control={<Radio />} label="all" />
                  <FormControlLabel value="motion" control={<Radio />} label="motion" />
                  <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
                </RadioGroup>
              </FormControl>
              <br />
              <TextField label="输入文本 1" variant="outlined" type="number" size="small" />
              <TextField label="输入文本 2" variant="outlined" type="number" size="small" />
              <TextField label="输入文本 3" variant="outlined" type="number" size="small" />
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">选择项2</FormLabel>
                <RadioGroup row>
                  <FormControlLabel value="all" control={<Radio />} label="all" />
                  <FormControlLabel value="motion" control={<Radio />} label="motion" />
                  <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
                </RadioGroup>
              </FormControl>
            </div>
          </ListItem>
          <Divider />
          <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Snapshot Settings" />
            <div style={{ width: '98%', alignSelf: 'center' }}>
              snapshot enabled:
              <Switch
                checked={state.snapshot}
                onChange={handleChange('snapshot')}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <br />
              <FormControlLabel
                control={<Switch checked={state.cleanCopy} onChange={handleChange('cleanCopy')} color="primary" />}
                label="clean_copy"
              />
              <FormControlLabel
                control={<Switch checked={state.timestamp} onChange={handleChange('timestamp')} color="primary" />}
                label="timestamp"
              />
              <br />
              <TextField label="Input Field" variant="outlined" type="number" size="small" />
              <TextField label="Input Field" variant="outlined" type="number" size="small" />
            </div>
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}
