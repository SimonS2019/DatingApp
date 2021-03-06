import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public accountService: AccountService, private router : Router, private toastr : ToastrService) {}

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        this.router.navigateByUrl('/members')
        console.log(response);
      },
      // (error) => {
      //   console.log(error);
      //   this.toastr.error(error.error)
      // }
    );
  }

  logout() {

    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe((user) => {
      // !! 表示如果 返回时 null 就是false
    },error=>{
      console.log(error);
      
    });
  }
}
