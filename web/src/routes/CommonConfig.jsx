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
import SaveSuccessSnackbar from '../components/SaveSuccessSnackBar';


export default function CommonConfig() {
  const { data: config } = useSWR('config');
  console.log(config);
  const [state, setState] = React.useState({
    detect: false,
    detect_width: 0,
    detect_height: 0,
    detect_fps: 0,
    max_disappeared: 0,
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
    birdseye: false,
    birdseye_width: 0,
    birdseye_height: 0,
    birdseye_quality: 0,
    birdseye_mode: '',
  });

  React.useEffect(() => {
    if (config) {
      setState((prevState) => ({
        ...prevState,
        detect: config.detect.enabled || false,
        detect_width: config.detect.width || 0,
        detect_height: config.detect.height || 0,
        detect_fps: config.detect.fps || 0,
        max_disappeared: config.detect.max_disappeared || 0,
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
        birdseye: config.birdseye.enabled || false,
        birdseye_width: config.birdseye.width || 0,
        birdseye_height: config.birdseye.height || 0,
        birdseye_quality: config.birdseye.quality || 0,
        birdseye_mode: config.birdseye.mode || 0,
      }));
    }
  }, [config]);

  const handleChange = (key) => (event) => {
    setState({ ...state, [key]: event.target.checked });
  };

  const handleDataChange = (key) => (event) => {
    setState({ ...state, [key]: event.target.value });
  };

  const [snackbarOpen, setsnackbarOpen] = React.useState(false);


  const handleSave = () => {
    let data = {
      birdseye: {
        enabled: state.birdseye,
        width: state.birdseye_width,
        height: state.birdseye_height,
        quality: state.birdseye_quality,
        mode: state.birdseye_mode,
      },
      detect: {
        enabled: state.detect,
        width: state.detect_width,
        height: state.detect_height,
        fps: state.detect_fps,
        max_disappeared: state.max_disappeared,
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
      <SaveSuccessSnackbar open={snackbarOpen} setOpen={setsnackbarOpen}/>
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
          <ListItemText primary={<Text id="C_Set.detect_Settings">Detect Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <Text id="C_Set.detect_enabled">detect enabled</Text>:
            <Switch
              checked={state.detect}
              onChange={handleChange('detect')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <br />
            <Text id="share.width">width</Text>:
            <TextField
              size="small"
              value={state.detect_width}
              type="number"
              onChange={handleDataChange('detect_width')}
            />
            <Text id="share.height">height</Text>:
            <TextField
              size="small"
              type="number"
              value={state.detect_height}
              onChange={handleDataChange('detect_height')}
            />
            <Text id="share.fps">fps</Text>:
            <TextField size="small" type="number" value={state.detect_fps} onChange={handleDataChange('detect_fps')} />
            <Text id="C_Set.max_disappeared">max_disappeared</Text>:
            <TextField
              size="small"
              type="number"
              value={state.max_disappeared}
              onChange={handleDataChange('max_disappeared')}
            />
          </div>
        </ListItem>
        <Divider />
        <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary={<Text id="C_Set.Record_Settings">Record Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <Text id="C_Set.record_enabled">record enabled</Text>:
            <Switch
              checked={state.record}
              onChange={handleChange('record')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <br />
            <Text id="C_Set.record_retain_days">record retain days</Text>:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.record_retain_days}
              onChange={handleDataChange('record_retain_days')}
            />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Text id="C_Set.record_retain_mode">record retain mode</Text>
              </FormLabel>
              <RadioGroup row value={state.record_retain_mode} onChange={handleDataChange('record_retain_mode')}>
                <FormControlLabel value="all" control={<Radio />} label={<Text id="share.all">all</Text>} />
                <FormControlLabel value="motion" control={<Radio />} label={<Text id="share.motion">motion</Text>} />
                <FormControlLabel
                  value="active_objects"
                  control={<Radio />}
                  label={<Text id="share.active_objects">active objects</Text>}
                />
              </RadioGroup>
            </FormControl>
            <br />
            <Text id="C_Set.event_pre_capture">event pre capture</Text>:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_pre_capture}
              onChange={handleDataChange('event_pre_capture')}
            />
            <Text id="C_Set.event_post_capture">event post capture</Text>:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_post_capture}
              onChange={handleDataChange('event_post_capture')}
            />
            <Text id="C_Set.event_retain_days">event retain days</Text>:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.event_retain_days}
              onChange={handleDataChange('event_retain_days')}
            />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Text id="C_Set.event_retain_model">event retain mode</Text>
              </FormLabel>
              <RadioGroup row value={state.event_retain_mode} onChange={handleDataChange('event_retain_mode')}>
                <FormControlLabel value="all" control={<Radio />} label={<Text id="share.all">all</Text>} />
                <FormControlLabel value="motion" control={<Radio />} label={<Text id="share.motion">motion</Text>} />
                <FormControlLabel
                  value="active_objects"
                  control={<Radio />}
                  label={<Text id="share.active_objects">active_objects</Text>}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </ListItem>
        <Divider />
        <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary={<Text id="C_Set.Snapshot_Settings">Snapshot Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <Text id="C_Set.snapshot_enabled">snapshot enabled</Text>:
            <Switch
              checked={state.snapshot}
              onChange={handleChange('snapshot')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <br />
            <Text id="C_Set.clean_copy">clean copy</Text>:
            <FormControlLabel
              control={<Switch checked={state.cleanCopy} onChange={handleChange('cleanCopy')} color="primary" />}
            />
            <Text id="C_Set.timestamp">timestamp</Text>:
            <FormControlLabel
              control={<Switch checked={state.timestamp} onChange={handleChange('timestamp')} color="primary" />}
            />
            <br />
            <Text id="C_Set.retain_days">retain days</Text>:
            <TextField
              variant="outlined"
              type="number"
              size="small"
              value={state.snapshot_retain_days}
              onChange={handleDataChange('snapshot_retain_days')}
            />
            <Text id="C_Set.height">height</Text>:
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
          <ListItemText primary={<Text id="C_Set.UI_Settings">UI Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <FormControl>
              <Text id="C_Set.time_format.name">time format</Text>:
              <Select value={state.time_format} onChange={handleDataChange} size="small">
                <MenuItem value={'browser'}>
                  <Text id="C_Set.time_format.browser">browser</Text>
                </MenuItem>
                <MenuItem value={'12hour'}>
                  <Text id="C_Set.time_format.12hour">12hour</Text>
                </MenuItem>
                <MenuItem value={'24hour'}>
                  <Text id="C_Set.time_format.Thirty">Thirty</Text>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
            <FormControl>
              <Text id="C_Set.date_style.name">date style</Text>:
              <Select value={state.date_style} onChange={handleDataChange} size="small">
                <MenuItem value={'full'}>
                  <Text id="C_Set.date_style.full">full</Text>
                </MenuItem>
                <MenuItem value={'long'}>
                  <Text id="C_Set.date_style.long">long</Text>
                </MenuItem>
                <MenuItem value={'medium'}>
                  <Text id="C_Set.date_style.medium">medium</Text>
                </MenuItem>
                <MenuItem value={'short'}>
                  <Text id="C_Set.date_style.short">short</Text>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
            <FormControl>
              <Text id="C_Set.time_style.name">time style</Text>:
              <Select value={state.time_style} onChange={handleDataChange} size="small">
                <MenuItem value={'full'}>
                  <Text id="C_Set.time_style.full">full</Text>
                </MenuItem>
                <MenuItem value={'long'}>
                  <Text id="C_Set.time_style.long">long</Text>
                </MenuItem>
                <MenuItem value={'medium'}>
                  <Text id="C_Set.time_style.medium">medium</Text>
                </MenuItem>
                <MenuItem value={'short'}>
                  <Text id="C_Set.time_style.short">short</Text>
                </MenuItem>
              </Select>
            </FormControl>{' '}
            <br />
          </div>
        </ListItem>
        <Divider />
        <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText primary={<Text id="C_Set.BirdsEye_Settings">BirdsEye Settings</Text>} />
          <div style={{ width: '98%', alignSelf: 'center' }}>
            <Text id="C_Set.birdseye_enabled">birdseye enabled</Text>:
            <Switch
              checked={state.birdseye}
              onChange={handleChange('birdseye')}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <br />
            <Text id="share.width">width</Text>:
            <TextField
              size="small"
              value={state.birdseye_width}
              type="number"
              onChange={handleDataChange('birdseye_width')}
            />
            <Text id="share.height">height</Text>:
            <TextField
              size="small"
              type="number"
              value={state.birdseye_height}
              onChange={handleDataChange('birdseye_height')}
            />
            <Text id="share.quality">quality</Text>:
            <TextField
              size="small"
              type="number"
              value={state.birdseye_quality}
              onChange={handleDataChange('birdseye_quality')}
            />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Text id="C_Set.mode.name">mode</Text>
              </FormLabel>
              <RadioGroup row value={state.birdseye_mode} onChange={handleDataChange('birdseye_mode')}>
                <FormControlLabel
                  value="objects"
                  control={<Radio />}
                  label={<Text id="C_Set.mode.objects">objects</Text>}
                />
                <FormControlLabel
                  value="motion"
                  control={<Radio />}
                  label={<Text id="C_Set.mode.motion">motion</Text>}
                />
                <FormControlLabel
                  value="continuous"
                  control={<Radio />}
                  label={<Text id="C_Set.mode.continuous">continuous</Text>}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}
