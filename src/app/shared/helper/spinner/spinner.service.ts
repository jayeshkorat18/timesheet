import { Injectable } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

@Injectable()
export class SpinnerService {
  private spinnerCache = new Set<SpinnerComponent>();
  constructor() { }

  _register(spinner: SpinnerComponent): void {

    this.spinnerCache.add(spinner);
    //console.log("Spoinner Register");
    //console.log(spinner);
  }

  show(): void {
    //alert("Hello")
    //console.log(this.spinnerCache);
    this.spinnerCache.forEach(spinner => {
      //console.log(spinner)
      setTimeout(() => {
        spinner.show = true;
      }, 0);

    });
  }
  hide(): void {
    this.spinnerCache.forEach(spinner => {
      spinner.show = false;
    });
  }
}
