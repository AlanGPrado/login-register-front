import { Component, Input } from '@angular/core';
import { burgerLineAnimation } from './burguer.animations';

@Component({
  selector: 'app-burguer',
  templateUrl: './burguer.component.html',
  styleUrls: ['./burguer.component.scss'],
  animations: [
    burgerLineAnimation('firstLine'),
    burgerLineAnimation('thirdLine', '-15px', '-45deg', '-60deg')
  ]
})
export class BurguerComponent {
  @Input()
  open: boolean | undefined;

  @Input()
  color = '#FFFF';
}
