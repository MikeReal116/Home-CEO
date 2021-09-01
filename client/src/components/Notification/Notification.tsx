import { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';

export enum Color {
  success = 'success',
  error = 'error'
}
interface Prop {
  title: string;
  description: string;
  severity: Color;
}

const NotificationMsg = ({ title, description, severity }: Prop) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Alert severity={severity} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </Snackbar>
  );
};

export default NotificationMsg;
