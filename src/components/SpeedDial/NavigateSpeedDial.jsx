// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function NavigateSpeedDial() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();


  const logout = () => {
    setAuth({});
    navigate('/login');
  }

  const goHome = () => {
    navigate('/', {replace: true})
  }

  const actions = [
    { icon: <LogoutIcon />, name: 'Logout', action: logout },
    { icon: <HomeIcon />, name: 'Go To Home', action: goHome }
  ];


  return (
    <SpeedDial
      ariaLabel="Actions"
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
      icon={<SettingsIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.action}
        />
      ))}
    </SpeedDial>
  );
}
