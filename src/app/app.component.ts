import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { LoginComponent } from './components/login/login.component';
import { Helpers } from './helpers/helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  authentication = false;
  display = true;
  menuItems: MenuItem[];

  constructor(private primeConfig: PrimeNGConfig, private helpers: Helpers, private router: Router, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.helpers.isAuthenticationChanged().subscribe((value) => { this.authentication = value; this.cdr.detectChanges(); });
  }

  ngOnInit() {
    this.authentication = this.helpers.isAuthenticated();
    this.primeConfig.ripple = true;
    this.menuItems = [
      {
        label: 'Dashboard',
        routerLink: ['/dashboard'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Data',
        routerLink: ['/data'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Metadata',
        items: [
          {
            label: 'Country',
            routerLink: ['/country'],
            routerLinkActiveOptions: { exact: true }
          },
          {
            label: 'Product',
            routerLink: ['/product'],
            routerLinkActiveOptions: { exact: true }
          },
          {
            label: 'Activity',
            routerLink: ['/activity'],
            routerLinkActiveOptions: { exact: true }
          }
        ]
      }
      // {
      //   label: 'Logout',
      //   command: (event) => {
      //     this.helpers.setToken(null);
      //     this.router.navigate(['/login']);
      //   }
      // }
    ]
  }

  signOut() {
    this.helpers.setToken(null);
    this.router.navigate(['/login']);
  }
}
