<template>
<!-- eslint-disable -->
  <div class="container">
    <ef-header class="toolbar" level="2">
      <div class="toolbar-items" slot="right">
        <ef-toggle class="theme-switcher" label="Light" checked-label="Dark" v-bind:checked.prop="this.isDarkTheme" @click="handleClickToggle"></ef-toggle>
        <ef-button icon="profile" @click="this.$refs.dialog.opened = true" ></ef-button>
      </div>
    </ef-header>
    <div class="content-container">
      <div class="sidebar-container">
        <ef-tab-bar ref="tab" vertical>
          <ef-tab @click="setChartData('line')" icon="chart-chartline" label="Line Chart" :active="chartType === 'line' || undefined"></ef-tab>
          <ef-tab @click="setChartData('area')" icon="chart-area" label="Area Chart" :active="chartType === 'area' || undefined"></ef-tab>
          <ef-tab @click="setChartData('bar')" icon="chart-bar" label="Bar Chart" :active="chartType === 'bar' || undefined"></ef-tab>
          <ef-tab @click="setChartData('candlestick')" icon="chart-candles" label="Candlestick Chart" :active="chartType === 'candlestick' || undefined"></ef-tab>
          <ef-tab @click="setChartData('volume')" icon="chart-line-bar" label="Volume Chart" :active="chartType === 'volume' || undefined"></ef-tab>
        </ef-tab-bar>
      </div>
      <div class="chart-container">
        <ef-interactive-chart v-bind:config.prop="chartConfig"></ef-interactive-chart>
      </div>
    </div>
    <ef-dialog ref="dialog" header="Edit profile">
      <div class="form-input">
        <label>Name</label>
        <ef-text-field ref="name" placeholder="Name" :value="userData.name" @value-changed="userData.name = this.$refs.name.value"></ef-text-field>
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
        <ef-datetime-picker ref="dateBirth" :value="userData.dateBirth" @value-changed="userData.dateBirth = this.$refs.dateBirth.value"></ef-datetime-picker>
      </div>
      <div class="form-input">
        <label>Address</label>
        <textarea rows='4' cols='50' v-model="userData.address"></textarea>
      </div>
      <div class="form-input">
        <label>Email</label>
        <ef-email-field ref="email" :value="userData.email" @value-changed="userData.email = this.$refs.email.value"></ef-email-field>
      </div>
      <div class="form-input">
        <label>Job Function</label>
        <div ref="jobfucntion" class="job-panel">
          <div>{{userData.job}}</div>
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
        <ef-checkbox ref="checkbox" :checked="userData.receiveNew === true" >I want to receive news and updates via email</ef-checkbox>
      </div>
      <div class="custom-dialog-footer" slot="footer" style="padding: 15px 25px;">
        <ef-button style="width:10%; margin:0px 5px" cta @click="onSave">Save</ef-button>
        <ef-button style="width:10%; margin:0px 5px" cta @click="this.$refs.dialog.opened = false">Cancel</ef-button>
      </div>
    </ef-dialog>
  </div>
</template>
<script>
import { data } from "./chartData";
export default {
  data() {
    return {
      userData: {},
      isDarkTheme: true,
      chartType: this.currentChart(),
      chartConfig: {},
    };
  },
  methods: {
    currentChart(){
      const currentChart = localStorage.chart ? localStorage.chart : 'line';
      return currentChart;
    },
    setChartData(type) {
      localStorage.chart = type;
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
      }
    },
    // onInput(field) {

    // },
    onSave() {
      console.log(this.userData)
      this.$refs.dialog.opened = false
    },
    handleClickToggle() {
      if(localStorage.theme == "dark") {
        localStorage.theme = "light";
        this.isDarkTheme = false;
        window.location.reload()
      } else {
        localStorage.theme = "dark";
        this.isDarkTheme = true;
        window.location.reload()
      }
    },

  },
  mounted() {
    this.setChartData(this.chartType)

    const theme = localStorage.theme;
    document.body.setAttribute("theme", `${theme}`);
    this.isDarkTheme = theme === "dark" ? true : false;

    const radioButtonGroup = this.$refs.radio;
    radioButtonGroup.addEventListener('checked-changed', (e) => {
      if (e.target.checked) {
        console.log(e.target.textContent);
        this.userData.gender = e.target.textContent
      }
    }, true);

    const checkbox = this.$refs.checkbox;
    checkbox.addEventListener('checked-changed', function (e) {
      e.target.checked ? console.log('Checked'):console.log('Unchecked')
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
        this.userData.job = value;
        overlayMenu.opened = false;
      }
    });

  },
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

</style>