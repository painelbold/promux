import { Component } from '@angular/core';

/**
 * Generated class for the PromuxHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'promux-header',
  templateUrl: 'promux-header.html'
})
export class PromuxHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello PromuxHeaderComponent Component');
    this.text = 'Hello World';
  }

}
