import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import { GetUser as User } from '../../lib/graphql/queries/User/__generated__/GetUser';
import { useStyles } from './styles';

interface Props {
  user: User['user'] | undefined;
  isViewerSameUser: boolean;
}

const UserDetail = ({ user, isViewerSameUser }: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} square={true} elevation={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.avatar}>
          <Avatar
            src={user?.avatar}
            alt={user?.name}
            className={classes.avatarImage}
          />
        </Grid>
        <hr />
        <Grid item xs={12}>
          <Typography variant='h6' color='primary'>
            Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Name:${user?.name}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Email: ${user?.email}`}</Typography>
        </Grid>
        {isViewerSameUser && (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' color='primary'>
                {' '}
                Additional Details{' '}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                {' '}
                Do you want to host people in your lovely apartment? Connect
                with your Stripe account. We use stripe to take and transfer
                your earnings in a secured way
              </Typography>
            </Grid>
            <Button variant='contained' color='primary'>
              Connect with Stripe
            </Button>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default UserDetail;
