import { useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, CircularProgress } from '@material-ui/core';

import { GetUser as User } from '../../lib/graphql/queries/User/__generated__/GetUser';
import { useStyles } from './styles';
import { Viewer } from '../../lib/types';
import { formatPrice } from '../../lib/utils/priceFormat';
import { stripeDisconnect } from '../../lib/graphql/mutations/StripeDisconnect/__generated__/stripeDisconnect';
import { STRIPE_DISCONNECT } from '../../lib/graphql/mutations/StripeDisconnect';

interface Props {
  user: User['user'] | undefined;
  isViewerSameUser: boolean;
  viewer: Viewer;
  setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
}

const UserDetail = ({ user, isViewerSameUser, viewer, setViewer }: Props) => {
  const classes = useStyles();
  const [stripeDisconnectFn, { loading }] = useMutation<stripeDisconnect>(
    STRIPE_DISCONNECT,
    {
      onCompleted: (data) => {
        if (data?.stripeDisconnect) {
          setViewer({ ...viewer, hasWallet: data.stripeDisconnect.hasWallet });
        }
      }
    }
  );

  const handleStripeClick = () => {
    window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write
    `;
  };

  const handleStripeDisconnectClick = () => {
    stripeDisconnectFn();
  };

  if (loading) {
    return <CircularProgress />;
  }

  const renderAdditionalDetails = isViewerSameUser ? (
    <>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary'>
          Additional Details
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {viewer.hasWallet ? (
          <>
            <Typography
              variant='subtitle2'
              className={classes.connected}
              paragraph
            >
              Stripe Connected
            </Typography>
            <Typography>
              {`Income :  ${user?.income ? formatPrice(user.income) : `0€`}`}
            </Typography>
          </>
        ) : (
          <Typography>
            Do you want to host people in your lovely apartment? Connect with
            your Stripe account. We use stripe to take and transfer your
            earnings in a secured way
          </Typography>
        )}
      </Grid>
      {viewer.hasWallet ? (
        <>
          <Button
            variant='contained'
            color='primary'
            onClick={handleStripeDisconnectClick}
            className={classes.disconnect}
          >
            Disconnect from Stripe
          </Button>
          <Typography variant='body2'>
            Disconnecting from Stripe will make it impossible for people to book
            your listings{' '}
          </Typography>
        </>
      ) : (
        <Button variant='contained' color='primary' onClick={handleStripeClick}>
          Connect with Stripe
        </Button>
      )}
    </>
  ) : null;

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
        {renderAdditionalDetails}
      </Grid>
    </Paper>
  );
};

export default UserDetail;
