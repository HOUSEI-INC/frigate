/* eslint-disable no-console */
import * as React from 'react';
import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import useSWR from 'swr';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Text } from 'preact-i18n';


export default function CommonConfig() {
  const { data: config } = useSWR('config');
  console.log(config);
  const [state, setState] = React.useState({
    detect: false,
    detect_width: 0,
    detect_height: 0,
    detect_fps: 0,
    record: false,
    record_retain_days: 0,
    record_retain_mode: '',
    event_pre_capture: 0,
    event_post_capture: 0,
    event_retain_days: 0,
    event_retain_mode: '',
    snapshot: false,
    cleanCopy: false,
    timestamp: false,
    snapshot_retain_days: 0,
    snapshot_height: 0,
    time_format: '',
    date_style: '',
    time_style: '',
  });

  React.useEffect(() => {
    if (config) {
      setState((prevState) => ({
        ...prevState,
        detect: config.detect.enabled || false,
        detect_width: config.detect.width || 0,
        detect_height: config.detect.height || 0,
        detect_fps: config.detect.fps || 0,
        record: config.record.enabled || false,
        record_retain_days: config.record.retain.days || 0,
        record_retain_mode: config.record.retain.mode || '',
        event_pre_capture: config.record.events.pre_capture || 0,
        event_post_capture: config.record.events.post_capture || 0,
        event_retain_days: config.record.events.retain.default || 0,
        event_retain_mode: config.record.events.retain.mode || '',
        snapshot: config.snapshots.enabled || false,
        cleanCopy: config.snapshots.clean_copy || false,
        timestamp: config.snapshots.timestamp || false,
        snapshot_retain_days: config.snapshots.retain.default || 0,
        snapshot_height: config.snapshots.height || 0,
        time_format: config.ui.time_format || '',
        date_style: config.ui.date_style || '',
        time_style: config.ui.time_style || '',
      }));
    }
  }, [config]);

  const handleChange = (key) => (event) => {
    setState({ ...state, [key]: event.target.checked });
  };

  const handleDataChange = (key) => (event) => {
    setState({ ...state, [key]: event.target.value });
  };

  const handleSave = () => {
    let data = {
      detect: {
        enabled: state.detect,
        width: state.detect_width,
        height: state.detect_height,
        fps: state.detect_fps,
      },
      record: {
        enabled: state.record,
        retain: {
          days: state.record_retain_days,
          mode: state.record_retain_mode,
        },
        events: {
          post_capture: state.event_post_capture,
          pre_capture: state.event_pre_capture,
          retain: {
            default: state.event_retain_days,
            mode: state.event_retain_mode,
          },
        },
      },
      snapshots: {
        enabled: state.snapshot,
        clean_copy: state.cleanCopy,
        height: state.snapshot_height,
        retain: {
          default: state.snapshot_retain_days,
        },
        timestamp: state.timestamp,
      },
      ui: {
        time_format: state.time_format,
        date_style: state.date_style,
      },
    };
    console.log(data);
    saveConfig(data);
  };

  const saveConfig = async (partial_config) => {
    try {
      const response = await axios.post(`config/partial/save?save_option=restart`, partial_config, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        console.log('save success');
      }
    } catch (error) {
      console.log('save filed');
    }
  };

  return (
    <div>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            <Text id="C_Set.title">Common Settings</Text>
          </Typography>
          <Button color="inherit" onClick={handleSave}>
            <Text id="C_Set.save_button">save</Text>
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary={<Text id="detect_Settings">Detect Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            detect enabled:
            <Switch
              checked={state.detect}
              onChange={handleChange('detect')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <br />
            width:
            <TextField
              size="small"
              value={state.detect_width}
              type="number"
              onChange={handleDataChange('detect_width')}
            />
            height:
            <TextField
              size="small"
              type="number"
              value={state.detect_height}
              onChange={handleDataChange('detect_height')}
            />
            fps:
            <TextField size="small" type="number" value={state.detect_fps} onChange={handleDataChange('detect_fps')} />
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
            record_retain_days:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.record_retain_days}
              onChange={handleDataChange('record_retain_days')}
            />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">record_retain_mode</FormLabel>
              <RadioGroup row value={state.record_retain_mode} onChange={handleDataChange('record_retain_mode')}>
                <FormControlLabel value="all" control={<Radio />} label="all" />
                <FormControlLabel value="motion" control={<Radio />} label="motion" />
                <FormControlLabel value="active_objects" control={<Radio />} label="active_objects" />
              </RadioGroup>
            </FormControl>
            <br />
            event_pre_capture:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_pre_capture}
              onChange={handleDataChange('event_pre_capture')}
            />
            event_post_capture:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_post_capture}
              onChange={handleDataChange('event_post_capture')}
            />
            event_retain_days:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_retain_days}
              onChange={handleDataChange('event_retain_days')}
            />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">event_retain_model</FormLabel>
              <RadioGroup row value={state.event_retain_mode} onChange={handleDataChange('event_retain_mode')}>
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
            clean_copy:
            <FormControlLabel
              control={<Switch checked={state.cleanCopy} onChange={handleChange('cleanCopy')} color="primary" />}
            />
            timestamp:
            <FormControlLabel
              control={<Switch checked={state.timestamp} onChange={handleChange('timestamp')} color="primary" />}
            />
            <br />
            retain_days:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.snapshot_retain_days}
              onChange={handleDataChange('snapshot_retain_days')}
            />
            height:
            <TextField
              onChange={handleDataChange('snapshot_height')}
              variant="outlined"
              type="number"
              size="small"
              value={state.snapshot_height}
            />
          </div>
        </ListItem>
        <Divider />
        <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary="UI Settings" />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <FormControl>
              time_format:
              <Select value={state.time_format} onChange={handleDataChange} size="small">
                <MenuItem value={'browser'}>browser</MenuItem>
                <MenuItem value={'12hour'}>12hour</MenuItem>
                <MenuItem value={'24hour'}>Thirty</MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
            <FormControl>
              date_style:
              <Select value={state.date_style} onChange={handleDataChange} size="small">
                <MenuItem value={'full'}>full</MenuItem>
                <MenuItem value={'long'}>long</MenuItem>
                <MenuItem value={'medium'}>medium</MenuItem>
                <MenuItem value={'short'}>short</MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
            <FormControl>
              time_style:
              <Select value={state.time_style} onChange={handleDataChange} size="small">
                <MenuItem value={'full'}>full</MenuItem>
                <MenuItem value={'long'}>long</MenuItem>
                <MenuItem value={'medium'}>medium</MenuItem>
                <MenuItem value={'short'}>short</MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
          </div>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
