import React, { useState, useEffect, useRef } from 'react';

import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/toggle';
import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elements/interactive-chart';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/email-field';
import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elements/checkbox';
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elements/tab';

import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import ProfileForm from './components/ProfileForm';

import './styles/lib/App.css';

function App({ theme }) {
  const dialogRef = useRef(null);

  const [chartType, setChartType] = useState('line');
  const [checked, setChecked] = useState(undefined);

  const toggleDialog = () => {
    if(!dialogRef.current) {
      return;
    }
    dialogRef.current.opened = !dialogRef.current.opened;
  }

  useEffect(() => {
    const isChecked = theme === 'dark' || undefined;
    document.body.setAttribute('theme', theme)
    setChecked(isChecked);
  },[theme]);

  const handleClickToggle = (e) => {
    const toggleTheme = e.target.checked ? 'dark' : 'light';
    sessionStorage.setItem('elf-theme', toggleTheme);
    window.location.reload();
  }

  const handleClickProfileButton = () => {
    if(!dialogRef.current) {
      return;
    }
    toggleDialog();
  }

  return (
    <div className='container'>
      <ef-header level='2' class='toolbar'>
        <div className='toolbar-items' slot='right'>
          Theme:
          <ef-toggle
            class='theme-switcher'
            label='light'
            checked-label='dark'
            checked={checked}
            onClick={handleClickToggle}
          >
          </ef-toggle>
          <ef-button id="profileButton" icon='profile' onClick={handleClickProfileButton}></ef-button>
        </div>
      </ef-header>
      <div className="content-container">
        <Sidebar chartType={chartType} setChartType={setChartType}/>
        <Chart chartType={chartType}/>
      </div>
      <ef-dialog ref={dialogRef} header='Edit Profile'>
        <ProfileForm toggleDialog={toggleDialog} />
      </ef-dialog>
    </div>
  )
}

export default App;
