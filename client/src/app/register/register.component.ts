import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Output() cancelRegister = new EventEmitter();
  model: any = {}

  constructor() { }
  // constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    console.log("register");
    
    // this.accountService.register(this.model).subscribe({
    //   next: () => {
    //     this.cancel();
    //   },
    //   error: error => console.log(error)
    // })
  }

  cancel() {
    console.log("cancel");

    // this.cancelRegister.emit(false);
  }

}