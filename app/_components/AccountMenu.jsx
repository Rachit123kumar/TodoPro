import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import { signOut } from '../_utils/actions';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function AccountMenu({title="",user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router=useRouter()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [buttonClicked,setButtonClicked]=React.useState(false)
  // console.log(user,"user", title,"title")

const queryClient= useQueryClient()

  async function handleLogout(){
    await signOut()

    queryClient.invalidateQueries({
      queryKey:["userInfo"]
    })
  
  }


  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
        {user && !buttonClicked ?<Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{title.at(0) }</Avatar>
          </IconButton>
        </Tooltip> :
        <p className='mr-3' onClick={()=>router.push("/login")}>Login</p>
        }
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {user?

          <MenuItem onClick={handleClose}>
          <Avatar onClick={()=>router.push('/profile')}/> Profile
        </MenuItem>:
          <MenuItem onClick={handleClose}>
          <Avatar onClick={()=>router.push('/login')}/> Login
        </MenuItem>

        }


        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
{ user &&  <div onClick={()=>router.push("/chat")}>

          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Chat Page

</div>}

        </MenuItem>



       <MenuItem onClick={handleClose}>
     {
user &&
       <div onClick={()=>router.push("/setting")}>
          <ListItemIcon >
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
       </div>
}
        </MenuItem>
       { user ?
       <div onClick={()=>handleLogout()}>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
       </div>:
        <MenuItem onClick={handleClose}>
          {/* handle Logout functionality and login */}
          <div onClick={()=>{}}>

          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Login
          </div>
        </MenuItem>
        
        }
      </Menu>
    </React.Fragment>
  );
}
