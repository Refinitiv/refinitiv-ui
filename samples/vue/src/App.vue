<template>
  <div class="container">
    <ef-header class="toolbar" level="2">
      <!-- eslint-disable-next-line -->
      <div class="toolbar-items" slot="right">
        <ef-toggle class="theme-switcher" label="Light" checked-label="Dark" v-bind:checked.prop="this.isDarkTheme" @click="handleClickToggle"></ef-toggle>
        <ef-button id="profileButton" icon="profile" @click="toggleDialog" ></ef-button>
      </div>
    </ef-header>
    <div class="content-container">
      <div class="sidebar-container">
        <ef-tab-bar ref="tab" vertical>
          <ef-tab @click="setChartType('line')" icon="chart-chartline" id="tabBarLine" label="Line Chart" :active="chartType === 'line' || undefined"></ef-tab>
          <ef-tab @click="setChartType('area')" icon="chart-area" id="tabBarArea" label="Area Chart" :active="chartType === 'area' || undefined"></ef-tab>
          <ef-tab @click="setChartType('bar')" icon="chart-bar" id="tabBarC" label="Bar Chart" :active="chartType === 'bar' || undefined"></ef-tab>
          <ef-tab @click="setChartType('candlestick')" icon="chart-candles" id="tabBarCandles" label="Candlestick Chart" :active="chartType === 'candlestick' || undefined"></ef-tab>
          <ef-tab @click="setChartType('volume')" icon="chart-line-bar" id="tabBarVolume" label="Volume Chart" :active="chartType === 'volume' || undefined"></ef-tab>
        </ef-tab-bar>
      </div>
      <div class="chart-container">
        <ef-interactive-chart ref="chart" v-bind:config.prop="chartConfig"></ef-interactive-chart>
      </div>
    </div>
    <ef-dialog ref="dialog" header="Edit profile">
      <div class="form-input">
        <label>Name*</label>
        <ef-text-field id="nameInput" ref="name" placeholder="Name" :value="formData.name"></ef-text-field>
      </div>
      <div class="form-input">
        <label>Gender</label>
        <div ref="radio">
          <ef-radio-button name="gender" >Male</ef-radio-button>
          <ef-radio-button name="gender" >Female</ef-radio-button>
          <ef-radio-button name="gender" >Prefer not to tell</ef-radio-button>
        </div>
      </div>
      <div class="form-input">
        <label>Date of Birth</label>
        <ef-datetime-picker ref="birthDate" :value="formData.birthDate"></ef-datetime-picker>
      </div>
      <div class="form-input">
        <label>Address</label>
        <textarea ref="address" autoCorrect="off" autoComplete="off" autoCapitalize="off" rows="4" cols="50" v-model="formData.address"></textarea>
      </div>
      <div class="form-input">
        <label>Email*</label>
        <ef-email-field id="emailInput" ref="email" :value="formData.email"></ef-email-field>
      </div>
      <div class="form-input">
        <label>Job Function</label>
        <div ref="jobfucntion" class="job-panel">
          <div>{{formData.job}}</div>
          <ef-icon icon="arrow-down-fill"></ef-icon>
        </div>
        <ef-overlay-menu ref="menu" id="menu">
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
      <div class="form-input">
        <ef-checkbox ref="checkbox" :checked="formData.isReceiveMail" >I want to receive news and updates via email</ef-checkbox>
      </div>
      <!-- eslint-disable-next-line -->
      <div class="form-footer" slot="footer">
        <ef-button id="confirmButton" cta @click="handleClickConfirm" :disabled="this.isSubmitDisable">Confirm</ef-button>
        <ef-button cta @click="toggleDialog">Cancel</ef-button>
      </div>
    </ef-dialog>
  </div>
</template>
<script>
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

import { data } from './chartData';
import { THEME } from './main';
export default {
  data () {
    return {
      formData: {
        isReceiveMail: true
      },
      isDarkTheme: true,
      chartType: 'line',
      chartConfig: {},
      isSubmitDisabled: true
    };
  },
  computed: {
    isSubmitDisable () {
      return !this.formData.name || !this.formData.email ? true : undefined;
    }
  },
  methods: {
    handleChangeFormData (propName, e) {
      let data = {};
      data[propName] = e.detail.value;
      this.formData = { ...this.formData, ...data };
    },
    setChartType (type) {
      this.chartType = type;
      this.chartConfig = {
        options: {
          timeScale: {
            timeVisible: true,
            secondsVisible: true
          }
        },
        series: [{
          symbol: 'Price',
          type: type,
          data: data
        }]
      };
    },
    toggleDialog () {
      const dialog = this.$refs.dialog;
      dialog.opened = !dialog.opened;
    },
    handleClickConfirm () {
      console.log('data =', JSON.stringify(this.formData, null, 2));
      this.toggleDialog();
    },
    handleClickToggle () {
      sessionStorage.setItem('theme', this.isDarkTheme ? 'light' : 'dark');
      window.location.reload();
    }
  },
  mounted () {
    this.setChartType(this.chartType);

    this.isDarkTheme = THEME === 'dark';

    const inputName = this.$refs.name;
    inputName.addEventListener('value-changed', this.handleChangeFormData.bind(this, 'name'));

    const inputEmail = this.$refs.email;
    inputEmail.addEventListener('value-changed', this.handleChangeFormData.bind(this, 'email'));

    const birthDateInput = this.$refs.birthDate;
    birthDateInput.addEventListener('value-changed', this.handleChangeFormData.bind(this, 'birthDate'));

    const radioButtonGroup = this.$refs.radio;
    radioButtonGroup.addEventListener('checked-changed', (e) => {
      if (e.target.checked) {
        this.formData.gender = e.target.textContent;
      }
    }, true);

    const checkbox = this.$refs.checkbox;
    checkbox.addEventListener('checked-changed', function (e) {
      this.formData.isReceiveMail = e.target.checked;
    });

    const overlayMenu = this.$refs.menu;
    this.$refs.jobfucntion.addEventListener('tap', () => {
      if (!overlayMenu.fullyOpened && !overlayMenu.transitioning) {
        overlayMenu.opened = true;
      }
    });
    overlayMenu.positionTarget = this.$refs.jobfucntion;
    overlayMenu.parentElement.addEventListener('item-trigger', (e) => {
      const value = e.detail.value;
      if(value.length > 0) {
        this.formData.job = value;
        overlayMenu.opened = false;
      }
    });
  }
};
</script>
<style lang="less">
body, #app, .container {
  height: 100%;
}

.toolbar {
  height: 36px;
  padding: 0 15px;
}

.toolbar-items {
  display: flex;
  align-items: center;
}

.theme-switcher {
  width: 80px;
  margin: 0 10px;
}

.content-container {
  display: flex;
  height: calc(100% - 37px);
}

.chart-container {
  display: flex;
  width: 100%;
  padding: 20px;
}

ef-interactive-chart {
  width: 100%;
  height: 100%;
}

.form-input {
 display: flex;
 flex-direction: column;
 margin-bottom: 20px;

 label {
   font-weight: 500;
   margin-bottom: 5px;
 }
}

ef-tab {
  min-width: 180px;
}

.job-panel {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  box-sizing: border-box;
  padding: 0 8px;
  height: 24px;
  width: 250px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;

  ef-button {
    margin-right: 10px;
  }
}
</style>
