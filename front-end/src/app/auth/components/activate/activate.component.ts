import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {

  userId = this.route.snapshot.params.id;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
              ) { }

  ngOnInit() {
  }

  activate():void{
    this.authService.activate(this.userId).subscribe(
      (res)=>{
          console.log(res);
          console.log(res.data);
          this.router.navigate(['/auth/login'])
      },
      (err)=>{
        console.log('err: ', err);
      },
      ()=>{
        console.log('done');
      }
    )
  }

}
