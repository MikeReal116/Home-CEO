import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { GetUser as User } from '../../lib/graphql/queries/User/__generated__/GetUser';

interface Props {
  user: User['user'] | undefined;
}

const UserDetail = ({ user }: Props) => {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Avatar src={user?.avatar} alt={user?.name} />
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <Typography variant='h6' paragraph>
            Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography paragraph>{`Name: ${user?.name}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{`Email: ${user?.email}`}</Typography>
        </Grid>

        <Divider />
      </Grid>
    </Paper>
  );
};

export default UserDetail;
