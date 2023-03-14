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
      path: 'tutorials/rain-drop-effect',
      name: '4 - Rain drop effect',
    },
    {
      path: 'tutorials/game-of-life',
      name: '5 - Game of life',
    },
    {
      path: 'tutorials/particles-image',
      name: '6 - Particles image',
    },
    {
      path: 'tutorials/feel-sphere',
      name: 'Feel sphere',
    },
  ];
}
