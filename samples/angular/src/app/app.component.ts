import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { data } from '../mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  public loading = true;
  public profileForm = this.fb.group({
    name: ['', Validators.required],
    gender: [''],
    birthdate: [''],
    address: [''],
    email: ['', [Validators.required, Validators.email]],
    job: [''],
    mailLetter: [true]
  });
  public chartType = 'line';
  public checked = false;
  
  public onTabChangeHandler = this.onTabChange.bind(this);

  @ViewChild('chart') chart!: ElementRef;
  @ViewChild('theme') theme!: ElementRef;
  @ViewChild('profile') profileBtn!: ElementRef;
  @ViewChild('dlg') dlg!: ElementRef;
  constructor (private fb: FormBuilder) {}

  async ngOnInit (): Promise<void> {
    const defaultTheme = sessionStorage.getItem('elf-theme') || 'light';
    await this.loadTheme(defaultTheme);
    this.loading = false;
    this.checked = defaultTheme === 'dark';
  }

  ngAfterViewInit (): void {
    this.generateChart();
  }

  loadTheme (theme: string): Promise<unknown> {
    document.documentElement.setAttribute('theme', theme);
    return import(`../themes/${theme}`);
  }

  onTabChange (chartType: string): void {
    this.chartType = chartType;
    this.generateChart();
  }

  generateChart (): void {
    this.chart.nativeElement.config = {
      options: {
        timeScale: {
          timeVisible: true,
          secondsVisible: true
        }
      },
      series: [
        {
          symbol: 'Price',
          type: this.chartType,
          data: data
        }
      ]
    };
  }

  handleThemeToggle (): void {
    const theme = this.theme.nativeElement.checked ? 'dark' : 'light';
    sessionStorage.setItem('elf-theme', theme);
    window.location.reload();
  }

  onOpenProfileDialog (): void {
    this.dlg.nativeElement.opened = true;
  }

  onSaveProfile (): void {
    console.log(this.profileForm.value);
    this.closeDialog();
  }

  closeDialog (): void {
    this.dlg.nativeElement.opened = false;
  }
}
