import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.less']
})
export class ProfileFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @ViewChild('jobPanel') jobPanel!: ElementRef;
  @ViewChild('overlayMenu') overlayMenu!: ElementRef;
  @ViewChild('birthdate') birthdateEle!: ElementRef;
  @ViewChild('genderGroup') genderGroupEle!: ElementRef;
  @ViewChild('letter') mailLetterEle!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit (): void {
    if (!this.form) {
      return;
    }
    
    this.overlayMenu.nativeElement.parentElement.addEventListener('item-trigger', this.handleJobChange.bind(this));
    this.birthdateEle.nativeElement.addEventListener('value-changed', this.onDateChange.bind(this));
    this.genderGroupEle.nativeElement.addEventListener('checked-changed', this.onGenderChecked.bind(this), true);
    this.mailLetterEle.nativeElement.addEventListener('checked-changed', this.onMailLetterChange.bind(this));
  }

  get name (): AbstractControl | undefined {
    if (!this.form) {
      return;
    }
    return this.form.get('name') as AbstractControl;
  }

  get email (): AbstractControl | undefined {
    if (!this.form) {
      return;
    }
    return this.form.get('email') as AbstractControl;
  }

  get job (): string {
    return this.form.value.job;
  }

  get mailLetter (): boolean {
    return this.form.value.mailLetter;
  }

  onOpenJobMenu (): void {
    if (this.overlayMenu.nativeElement) {
      this.overlayMenu.nativeElement.positionTarget = this.jobPanel.nativeElement;
      this.overlayMenu.nativeElement.opened = true;
    }
  }

  handleJobChange (e: CustomEvent): void {
    const value = e.detail.value;
    if (value) {
      this.overlayMenu.nativeElement.opened = false;
      this.form.patchValue({ job: value });
    }
  }

  onDateChange (e: CustomEvent): void {
    this.form.patchValue({ birthdate: e.detail.value });
  }

  onGenderChecked (e: any): void {
    this.form.patchValue({ gender: e.target?.value });
  }

  onMailLetterChange (e: any): void {
    this.form.patchValue({ mailLetter: e.target.value });
  }

}
