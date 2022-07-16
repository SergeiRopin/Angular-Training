import { Component } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  developer = "Sergii Ropin";
  instagram = '@sergei.ropin';
  github = "https://github.com/SergeiRopin";
}
