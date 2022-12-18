import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  links = [
    {
      path: 'tutorials/fundamentals',
      name: 'Fundamentals',
    },
    {
      path: 'tutorials/feel-sphere',
      name: 'Feel sphere',
    },
  ];
}
