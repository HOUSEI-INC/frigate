import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Text } from 'preact-i18n'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SaveSuccessSnackbar({open,setOpen}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={ {vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {<Text id="save_success_msg" />}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
