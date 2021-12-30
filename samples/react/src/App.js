import React, { useState, useEffect, useRef } from 'react';

import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import ProfileForm from './components/ProfileForm';

import './styles/lib/App.css';

function App() {
  const dialogRef = useRef(null);

  const [chartType, setChartType] = useState('line');
  const [checked, setChecked] = useState(undefined);

  useEffect(() => {
    const defaultTheme = document.documentElement.getAttribute('theme');
    const isChecked = defaultTheme === 'dark' || undefined;
    setChecked(isChecked);
  },[]);

  const handleClickToggle = (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    sessionStorage.setItem('elf-theme', theme);
    window.location.reload();
  }

  const handleClickProfileButton = () => {
    if(!dialogRef.current) return;
    dialogRef.current.opened = true;
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
          <ef-button icon='profile' onClick={handleClickProfileButton}></ef-button>
        </div>
      </ef-header>
      <div className="content-container">
        <Sidebar chartType={chartType} setChartType={setChartType}/>
        <Chart chartType={chartType}/>
      </div>
      <ef-dialog ref={dialogRef} header='Edit Profile'>
        <ProfileForm />
      </ef-dialog>
    </div>
  )
}

export default App;
