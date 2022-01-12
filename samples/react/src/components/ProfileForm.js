import React, { useRef, useState, useLayoutEffect } from 'react';

const ProfileForm = ({ toggleDialog }) => {
  const textFieldRef = useRef(null);
  const radioGroupRef = useRef(null);
  const dateRef = useRef(null);
  const emailRef = useRef(null);
  const overlayMenuRef = useRef(null);
  const checkboxRef = useRef(null);

  const [formData, setFormData] = useState({ isReceiveMail: true });

  const handleChangeFormData = (data) => {
    setFormData((prevState) => {
      return { ...prevState, ...data };
    });
  };

  useLayoutEffect(() => {
    const { current } = textFieldRef;
    if (!current) {
      return;
    }
    current.addEventListener('value-changed', (e) =>
      handleChangeFormData({ name: e.detail.value })
    );
    return () =>
      current.removeEventListener('value-changed', (e) =>
        handleChangeFormData({ name: e.detail.value })
      );
  }, [textFieldRef]);

  useLayoutEffect(() => {
    if (!radioGroupRef.current) {
      return;
    }
    const radios = radioGroupRef.current.querySelectorAll('ef-radio-button');
    for (const radio of radios) {
      radio.addEventListener('checked-changed', (e) =>
        handleChangeFormData({ gender: e.target.textContent })
      );
    }
    return () => {
      for (const radio of radios) {
        radio.removeEventListener('checked-changed', (e) =>
          handleChangeFormData({ gender: e.target.textContent })
        );
      }
    };
  }, [radioGroupRef]);

  useLayoutEffect(() => {
    const { current } = emailRef;
    if (!current) {
      return;
    }
    current.addEventListener('value-changed', (e) =>
      handleChangeFormData({ email: e.detail.value })
    );
    return () =>
      current.removeEventListener('value-changed', (e) =>
        handleChangeFormData({ email: e.detail.value })
      );
  }, [emailRef]);

  useLayoutEffect(() => {
    const { current } = dateRef;
    if (!current) {
      return;
    }
    current.addEventListener('value-changed', (e) =>
      handleChangeFormData({ date: e.detail.value })
    );
    return () =>
      current.removeEventListener('value-changed', (e) =>
        handleChangeFormData({ date: e.detail.value })
      );
  }, [dateRef]);

  useLayoutEffect(() => {
    const jobPanel = document.getElementById('jobPanel');
    const { current: overlayMenu } = overlayMenuRef;

    if (!overlayMenu) {
      return;
    }

    overlayMenu.positionTarget = jobPanel;

    const handleItemTrigger = (value) => {
      if (value) {
        handleChangeFormData({ job: value });
        overlayMenu.opened = false;
      }
    };

    overlayMenu.parentElement.addEventListener('item-trigger', (e) =>
      handleItemTrigger(e.detail.value)
    );
    return () =>
      overlayMenu.parentElement.addEventListener('item-trigger', (e) =>
        handleItemTrigger(e.detail.value)
      );
  }, [overlayMenuRef]);

  useLayoutEffect(() => {
    const { current } = checkboxRef;
    if (!current) {
      return;
    }
    current.addEventListener('checked-changed', (e) =>
      handleChangeFormData({ isReceiveMail: e.target.checked })
    );
    return () =>
      current.removeEventListener('checked-changed', (e) =>
        handleChangeFormData({ isReceiveMail: e.target.checked })
      );
  }, [checkboxRef]);

  const handleClickJob = () => {
    if (!overlayMenuRef.current) {
      return;
    }
    overlayMenuRef.current.opened = true;
  };

  const handleClickConfirm = () => {
    console.log('data =', JSON.stringify(formData, null, 2));
    toggleDialog();
  };

  const isSubmitDisabled = !formData.name || !formData.email ? true : undefined;

  return (
    <>
      <div className="form-input">
        <label>Name *</label>
        <ef-text-field
          id="nameInput"
          ref={textFieldRef}
          placeholder="Name"
        ></ef-text-field>
      </div>
      <div className="form-input">
        <label>Gender</label>
        <div ref={radioGroupRef}>
          <ef-radio-button name="gender">Male</ef-radio-button>
          <ef-radio-button name="gender">Female</ef-radio-button>
          <ef-radio-button name="gender">Prefer not to say</ef-radio-button>
        </div>
      </div>
      <div className="form-input">
        <label>Date of Birth</label>
        <ef-datetime-picker ref={dateRef}></ef-datetime-picker>
      </div>
      <div className="form-input">
        <label>Address</label>
        <textarea
          autoCorrect="off"
          autoComplete="off"
          autoCapitalize="off"
          rows="4"
          cols="50"
          onChange={(e) => handleChangeFormData({ address: e.target.value })}
        ></textarea>
      </div>
      <div className="form-input">
        <label>Email *</label>
        <ef-email-field
          id="emailInput"
          ref={emailRef}
          placeholder="user@refinitiv.com"
        ></ef-email-field>
      </div>
      <div className="form-input">
        <label>Job Function</label>
        <div
          id="jobPanel"
          className="job-panel"
          role="button"
          onClick={handleClickJob}
        >
          <div>{formData.job}</div>
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
          <ef-item value="ECM / DCM - Origination / Syndication">
            ECM / DCM - Origination / Syndication*
          </ef-item>
          <ef-item value="M&A / Coverage Banker Senior">
            M&A / Coverage Banker Senior
          </ef-item>
          <ef-item value="M&A / Coverage Banker Junior">
            M&A / Coverage Banker Junior
          </ef-item>
          <ef-item value="Private Equity / Venture Capital">
            Private Equity / Venture Capital
          </ef-item>
          <ef-item value="Investment Banking Business Manager">
            Investment Banking Business Manager
          </ef-item>
        </ef-overlay-menu>
        <ef-overlay-menu id="research">
          <ef-item value="Research / Market Analyst">
            Research / Market Analyst*
          </ef-item>
          <ef-item value="Quant">Quant</ef-item>
          <ef-item value="Economist">Economist</ef-item>
          <ef-item value="Investment Strategist">Investment Strategist</ef-item>
        </ef-overlay-menu>
      </div>
      <div className="form-input">
        <ef-checkbox ref={checkboxRef} checked={formData.isReceiveMail}>
          I want to receive news and updates via email
        </ef-checkbox>
      </div>
      <div className="form-footer" slot="footer">
        <ef-button
          id="confirmButton"
          cta
          onClick={handleClickConfirm}
          disabled={isSubmitDisabled}
        >
          Confirm
        </ef-button>
        <ef-button onClick={() => toggleDialog()}>Cancel</ef-button>
      </div>
    </>
  );
};

export default ProfileForm;
