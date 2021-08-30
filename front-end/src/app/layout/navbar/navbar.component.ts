import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: AuthService,
  private router: Router) { }

  logout() {
    this.userService.logout().subscribe(_=>{
      console.log('logout:', _);
      this.router.navigate(['/auth'])
      localStorage.removeItem('myToken');
    })
  }

  ngOnInit(){}
}
