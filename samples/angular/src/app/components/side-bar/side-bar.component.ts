import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less']
})
export class SideBarComponent implements OnInit {
  @Input()
  chartType!: string;
  
  @Input()
  onTabClickCallback!: (args: any) => void;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit (): void {}

  onTabClick (chartType: string): void {
    this.onTabClickCallback(chartType);
  }
}
