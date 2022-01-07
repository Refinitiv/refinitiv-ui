import { mount } from '@vue/test-utils';
import App from '../../src/App.vue'
import (`../../src/themes/light`)

describe('App.vue', () => {
  it('Should Change chart type', async () => {
    const wrapper = mount(App)
    const chart = await wrapper.find('ef-interactive-chart');
    expect(chart.element.config.series[0].type).toBe('line');
    await wrapper.find('#tabBarArea').trigger('click');
    expect(chart.element.config.series[0].type).toBe('area');
    await wrapper.find('#tabBarC').trigger('click');
    expect(chart.element.config.series[0].type).toBe('bar');
    await wrapper.find('#tabBarCandles').trigger('click');
    expect(chart.element.config.series[0].type).toBe('candlestick');
    await wrapper.find('#tabBarVolume').trigger('click');
    expect(chart.element.config.series[0].type).toBe('volume');
  })
  it('Should open profile dialog', () => {
    const wrapper = mount(App);
    const profileButton = wrapper.find('#profileButton');
    profileButton.trigger('click')
    const dialog = wrapper.find('ef-dialog');
    expect(dialog.element.opened).toBe(true);
  });
  it('Should have default value in checkbox before and after open dialog', () => {
    const wrapper = mount(App);
    let checkbox = wrapper.find('ef-checkbox');
    expect(checkbox.element.checked).toBe(true);
    const profileButton = wrapper.find('#profileButton');
    profileButton.trigger('click')
    checkbox = wrapper.find('ef-checkbox');
    expect(checkbox.element.checked).toBe(true);
  });
  it('Should disable/enable confirm button', async() => {
    const wrapper = mount(App);
    const profileButton = wrapper.find('#profileButton');
    profileButton.trigger('click')

    const confirmButton = wrapper.find('#confirmButton');
    expect(confirmButton.element.disabled).toBe(true);

    const nameInput = wrapper.find('#nameInput');
    nameInput.element.value = 'name';
    await nameInput.element.dispatchEvent(new CustomEvent('value-changed', { detail: { value: 'name'} }));

    const emailInput = wrapper.find('#emailInput');
    emailInput.element.value = 'user@refinitiv.com';
    await emailInput.element.dispatchEvent(new CustomEvent('value-changed', { detail: { value: 'user@refinitiv.com' }}));
    expect(confirmButton.element.disabled).toBe(false);
  });
})