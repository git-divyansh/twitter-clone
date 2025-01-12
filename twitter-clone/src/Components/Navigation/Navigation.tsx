import { useNavigate } from 'react-router-dom'
import { navigationMenu } from './NavigationMenu'
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

import React from 'react';
import { RootState, useAppDispatch } from '../../Store/store';
import { useSelector } from 'react-redux';
import { logout } from '../../Store/Auth/Action';

const Navigation = () => {

  const dispatch = useAppDispatch();

  const {auth} = useSelector((state : RootState) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());
    handleClose();
  }

  return (
    <div className='h-screen sticky top-0'>
      <div>
        <div className='py-5'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
</svg>
        </div>
        <div className='space-y-6'>
            {
                    navigationMenu.map((item) => 
                        <div className='cursor-pointer flex space-x-3 item-center'
                        onClick={() => 
                            {
                            item.title === "Profile" ? navigate(`/profile/${auth?.user?.id}`) : navigate(item.path)
                            }
                        }
                        >
                            <item.icon />
                            <p className='text-xl'>{item.title}</p>
                        </div>
                    )
            }
        </div>
        <div className='py-10'>
            <Button
              sx={{width:"100%", borderRadius:"29px", paddingY:"15px", bgcolor:'#1e88e5'}}
              variant='contained'
            > 
              Tweet
            </Button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <Avatar 
                alt='username'
                src='https://cdn-icons-png.flaticon.com/512/6858/6858504.png'
              />
              <div className='flex flex-col'>
                  <p>{auth?.user?.fullName}</p>
                  <span className='opacity-70'>@{auth?.user?.fullName.split(" ").join("_").toLowerCase()}</span>
              </div>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
      </div>
    </div>
  )
}

export default Navigation