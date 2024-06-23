import { Component, EventEmitter, Input, Output } from '@angular/core';
import { menuAnimation } from './menu.animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [menuAnimation()]
})
export class MenuComponent {
  routes: string[] = ['/home', '/add-product', '/edit-product', '/edit-user', '/login'];

  @Input()
  expanded?: boolean;

  @Input()
  items?: string[];

  @Output()
  onItemClick = new EventEmitter<void>(false);
}
