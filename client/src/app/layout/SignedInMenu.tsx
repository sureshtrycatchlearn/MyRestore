import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { signOut } from '../../feature/Account/accountSlice';
import { clearBasket } from '../../feature/basket/basketSlice';
import { Link } from 'react-router-dom';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state=>state.account)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
        color='inherit'
        onClick={handleClick}
        sx={{typography:'h6'}}
       >
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem component={Link} to='/orders'>My Orders</MenuItem>
        <MenuItem onClick={()=>{
          dispatch(signOut());
          dispatch(clearBasket());
        }}>Logout</MenuItem>
      </Menu>
    </>
  );
}