import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BrainService } from '../product.service';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BrainService]
})
export class LoginComponent implements OnInit {

  // --------------------- Variables ---------------------------------------------//
  loginForm: FormGroup;
  payload = {};
  Email: string = '';
  Password: string = '';
  Role: string;
  message: string;
  invalidPassword= false;
  // -----------------------------------------------------------------------------//

  // ------------------------------- Constructor ---------------------------------//
  constructor(
    public router: Router,
    private service: BrainService,
    private fb: FormBuilder,
  ) {

    // To initialize FormGroup
    this.loginForm = fb.group({
      'Email': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  // -----------------------------------------------------------------------------//

  ngOnInit() {
    const token = this.service.getToken();
    if (token) {
      this.backClicked();
    }
  }

  backClicked() {
    debugger
    this.router.navigate(['/home/product']);
  }

  login(form: NgForm) {
    debugger;

    // console.log(form);
    //
    const UserDetails = {
      email: form['Email'],
      password: form['Password']
    };
    this.service.login(UserDetails).subscribe((data) => {
      if (data['success']) {
        debugger;
        localStorage.setItem('token', data['token']);
        localStorage.setItem('userId', data['user']['_id']);

        localStorage.setItem('email', data['user']['email']);
        this.message = 'Login Successful';
        this.service.successMessage(this.message);

        this.router.navigate(['/home/product']);
      }
    }, (err) => {
      this.invalidPassword = true;
      const Email = document.getElementById('email');
      Email.className = 'errorTextBox';
      const Password = document.getElementById('password');
      Password.className = 'errorTextBox';
    });
  }
}
