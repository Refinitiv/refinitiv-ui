import React, { useRef, useEffect, useState } from 'react'

const ProfileForm = () => {
  const overlayMenuRef = useRef(null);

  const [job, setJob] = useState('');

  const handleClickJob = () => {
    if(overlayMenuRef.current) {
      overlayMenuRef.current.opened = true;
    }
  }

  useEffect(() => {
    const jobPanel = document.getElementById('jobPanel');
    const { current: overlayMenu } = overlayMenuRef
    if(overlayMenu) {
      overlayMenu.positionTarget = jobPanel;
      overlayMenu.parentElement.addEventListener('item-trigger', (e) => {
        const value = e.detail.value;
        if(value) {
          setJob(value);
          overlayMenu.opened = false;
        }
      });
    }
  }, [overlayMenuRef])

  return (
    <>
      <div className="form-input">
        <label>Name</label>
        <ef-text-field placeholder='Name'></ef-text-field>
      </div>
      <div className="form-input">
        <label>Gender</label>
        <div>
          <ef-radio-button name='gender'>Male</ef-radio-button>
          <ef-radio-button name='gender'>Female</ef-radio-button>
          <ef-radio-button name='gender'>Not specific</ef-radio-button>
        </div>
      </div>
      <div className="form-input">
        <label>Date of Birth</label>
        <ef-datetime-picker></ef-datetime-picker>
      </div>
      <div className="form-input">
        <label>Address</label>
        <textarea rows='4' cols='50'></textarea>
      </div>
      <div className="form-input">
        <label>Email</label>
        <ef-email-field placeholder="user@refinitiv.com"></ef-email-field>
      </div>
      <div className="form-input">
        <label>Job Function</label>
        <div id="jobPanel" className="job-panel" role="button" onClick={handleClickJob}>
          <div>{job}</div>
          <ef-icon icon="arrow-down-fill"></ef-icon>
        </div>
        <ef-overlay-menu ref={overlayMenuRef} id="menu">
          <ef-item for="saletrade">Sales & Trading</ef-item>
          <ef-item for="maandcr">M&A and Capital Raising</ef-item>
          <ef-item for="research">Research / Analysis</ef-item>
          </ef-overlay-menu>
        <ef-overlay-menu id="saletrade">
          <ef-item value="Trader">Trader*</ef-item>
          <ef-item value="Sales">Sales*</ef-item>
          <ef-item value="Broker">Broker*</ef-item>
        </ef-overlay-menu>
        <ef-overlay-menu id="maandcr">
          <ef-item value="ECM / DCM - Origination / Syndication">ECM / DCM - Origination / Syndication*</ef-item>
          <ef-item value="M&A / Coverage Banker Senior">M&A / Coverage Banker Senior</ef-item>
          <ef-item value="M&A / Coverage Banker Junior">M&A / Coverage Banker Junior</ef-item>
          <ef-item value="Private Equity / Venture Capital">Private Equity / Venture Capital</ef-item>
          <ef-item value="Investment Banking Business Manager">Investment Banking Business Manager</ef-item>
        </ef-overlay-menu>
        <ef-overlay-menu id="research">
          <ef-item value="Research / Market Analyst">Research / Market Analyst*</ef-item>
          <ef-item value="Quant">Quant</ef-item>
          <ef-item value="Economist">Economist</ef-item>
          <ef-item value="Investment Strategist">Investment Strategist</ef-item>
        </ef-overlay-menu>
      </div>
      <div className="form-input">
        <ef-checkbox>I want to receive news and updates via email</ef-checkbox> 
      </div>
    </>
  )  
}

export default ProfileForm;
