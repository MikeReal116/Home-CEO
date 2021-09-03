import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from './styles';
import { Viewer } from '../../lib/types';
import { Button } from '@material-ui/core';
import { LOGOUT } from '../../lib/graphql';
import { LogOut } from '../../lib/graphql/mutations/LogOut/__generated__/LogOut';
import { errorNotification } from '../../lib/notifications/error';

interface Props {
  viewer: Viewer;
  setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
}

const Header = ({ viewer, setViewer }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const history = useHistory();
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const [logOutFn, { error: logoutError }] = useMutation<LogOut>(LOGOUT, {
    onCompleted: (data) => {
      setViewer(data.logOut);
      sessionStorage.removeItem('token');
    }
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickProfile = () => {
    handleClose();
    history.push(`/user/{viewer.id}`);
  };
  const handleClickLogout = () => {
    handleClose();
    logOutFn();
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const renderAccount = viewer.id ? (
    <div>
      <IconButton onClick={handleMenu}>
        <Avatar src={viewer.avatar || ''} alt='avatar' />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
        <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
      </Menu>
    </div>
  ) : (
    <Button variant='contained' color='primary' component={Link} to='/login'>
      Login
    </Button>
  );

  return (
    <>
      <AppBar position='fixed' color='transparent'>
        <Toolbar className={classes.toolbar}>
          <IconButton className={classes.logo} component={Link} to='/'>
            <HomeIcon fontSize='large' />
          </IconButton>
          <div className={classes.right}>
            <div className={classes.host}>
              <HomeOutlinedIcon />
              <Typography
                className={classes.hostText}
                component={Link}
                to='/host'
              >
                Host
              </Typography>
            </div>

            {renderAccount}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
      {logoutError && errorNotification('failed to logout')}
    </>
  );
};

export default Header;
