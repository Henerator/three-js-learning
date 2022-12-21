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
      name: '1 - Fundamentals',
    },
    {
      path: 'tutorials/graph-scene',
      name: '2 - Scene graph',
    },
    {
      path: 'tutorials/custom-geometry',
      name: '3 - Custom geometry',
    },
    {
      path: 'tutorials/feel-sphere',
      name: 'Feel sphere',
    },
  ];
}
