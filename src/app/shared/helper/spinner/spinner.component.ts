import { Component,Input, OnInit } from '@angular/core';
import {SpinnerService} from './spinner.service';
@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() show = false;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService._register(this);
  }

}
