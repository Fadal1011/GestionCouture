import { AbstractControl, ValidatorFn } from '@angular/forms';

// Custom validator function
function customValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {

    if (control.value && control.value.indexOf('example') !== -1) {
      return { 'invalidValue': true };
    }
    return null;
  };
}
