import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

const Header = () => (
  <AppBar
    title="WORKOUT BAE"
    showMenuIconButton={false}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><NavigationMenu /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Login" containerElement={<Link to="/login" />} />
        <MenuItem primaryText="Sign up" containerElement={<Link to="/signup" />} />
      </IconMenu>
    }
  />
);

export default Header;
