import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { BrainService } from '../brain.service';
import { Validators } from '@angular/forms';
var LoginComponent = /** @class */ (function () {
    // -----------------------------------------------------------------------------//
    // ------------------------------- Constructor ---------------------------------//
    function LoginComponent(router, service, fb) {
        this.router = router;
        this.service = service;
        this.fb = fb;
        this.payload = {};
        this.Email = '';
        this.Password = '';
        this.invalidPassword = false;
        // To initialize FormGroup
        this.loginForm = fb.group({
            'Email': [null, Validators.required],
            'Password': [null, Validators.required]
        });
    }
    // -----------------------------------------------------------------------------//
    LoginComponent.prototype.ngOnInit = function () {
        var token = this.service.getToken();
        if (token) {
            this.backClicked();
        }
    };
    LoginComponent.prototype.backClicked = function () {
        debugger;
        this.router.navigate(['/home/user']);
    };
    LoginComponent.prototype.login = function (form) {
        var _this = this;
        debugger;
        // console.log(form);
        //
        var UserDetails = {
            email: form['Email'],
            password: form['Password']
        };
        this.service.login(UserDetails).subscribe(function (data) {
            if (data['success']) {
                debugger;
                localStorage.setItem('token', data['token']);
                localStorage.setItem('userId', data['user']['_id']);
                localStorage.setItem('email', data['user']['email']);
                _this.message = 'Login Successful';
                _this.service.successMessage(_this.message);
                _this.router.navigate(['/home/user']);
            }
        }, function (err) {
            _this.invalidPassword = true;
            var Email = document.getElementById('email');
            Email.className = 'errorTextBox';
            var Password = document.getElementById('password');
            Password.className = 'errorTextBox';
        });
    };
    LoginComponent.prototype.signUp = function () {
        this.router.navigate(['/signup']);
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            providers: [BrainService]
        })
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map