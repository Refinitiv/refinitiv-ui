import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SideBarComponent,
        ProfileFormComponent
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should render with light theme`, () => {
    const theme = fixture.debugElement.parent?.parent?.nativeElement.getAttribute('theme');
    expect(theme).toEqual('light');
  });

  it('should change chart type', () => {
    const chart = component.chart;
    expect(chart.nativeElement.config.series[0].type).toBe('line');
    
    const areaChartTab = fixture.nativeElement.querySelector('ef-tab[label="Area Chart"]');
    areaChartTab.click();
    fixture.detectChanges();
    expect(chart.nativeElement.config.series[0].type).toBe('area');

    const barChartTab = fixture.nativeElement.querySelector('ef-tab[label="Bar Chart"]');
    barChartTab.click();
    fixture.detectChanges();
    expect(chart.nativeElement.config.series[0].type).toBe('bar');
  });

  it('should open profile dialog', () => {
    const profileButton = component.profileBtn.nativeElement;
    profileButton.click();
    const dialog = component.dlg.nativeElement;
    expect(dialog.opened).toBe(true);
  });

  it('should have default value in checkbox before and after open dialog', () => {
    const checkbox = component.dlg.nativeElement.querySelector('ef-checkbox');
    expect(checkbox.checked).toBe(true);
    
    const profileButton = component.profileBtn.nativeElement;
    profileButton.click();
    fixture.detectChanges();
    expect(checkbox.checked).toBe(true);
  });

  it('should disable/enable confirm button',async () => {
    const profileButton = component.profileBtn.nativeElement;
    profileButton.click();
  
    const dialog = component.dlg.nativeElement;
    const confirmButton = dialog.querySelector('#confirm-btn');
    expect(confirmButton.disabled).toBe(true);

    component.profileForm.patchValue({name: 'name', email: 'user@refinitiv.com'});
    fixture.detectChanges();
    expect(confirmButton.disabled).toBe(false);
  });
});
