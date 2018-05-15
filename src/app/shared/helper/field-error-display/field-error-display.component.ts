import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../service/validation.service';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent {
  @Input() control: FormControl;
  @Input() submitAttempt: boolean;
  @Input() Name: string;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (!this.control.valid && this.submitAttempt && (this.control.dirty || this.submitAttempt)) {
        return ValidationService.getValidatorErrorMessage(this.Name, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
}
