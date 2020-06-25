import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BrainService } from '../brain.service';
var SignupComponent = /** @class */ (function () {
    // ------------------------------- Constructor ---------------------------------//
    function SignupComponent(formBuilder, router, service) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.service = service;
        this.titleAlert = 'This field is required';
        this.post = '';
        this.invalidPassword = false;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.createForm();
    };
    SignupComponent.prototype.createForm = function () {
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.formGroup = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
            name: [null, Validators.required],
            password: [null, [Validators.required, this.checkPassword]],
            phoneNumber: [null, Validators.required],
        });
    };
    Object.defineProperty(SignupComponent.prototype, "name", {
        get: function () {
            return this.formGroup.get('name');
        },
        enumerable: true,
        configurable: true
    });
    SignupComponent.prototype.checkPassword = function (control) {
        var enteredPassword = control.value;
        var passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
        return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
    };
    SignupComponent.prototype.checkInUseEmail = function (control) {
        // mimic http database access
        var db = ['tony@gmail.com'];
        return new Observable(function (observer) {
            setTimeout(function () {
                var result = (db.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
                observer.next(result);
                observer.complete();
            }, 4000);
        });
    };
    SignupComponent.prototype.getErrorEmail = function () {
        return this.formGroup.get('email').hasError('required') ? 'Field is required' :
            this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' :
                this.formGroup.get('email').hasError('alreadyInUse') ? 'This email address is already in use' : '';
    };
    SignupComponent.prototype.getErrorPassword = function () {
        return this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
            this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
    };
    SignupComponent.prototype.onSubmit = function (post) {
        var _this = this;
        debugger;
        var userDetails = {
            name: post.name,
            email: post.email,
            password: post.password,
            phoneNumber: post.phoneNumber
        };
        this.service.signUp(userDetails).subscribe(function (res) {
            debugger;
            if (res['success']) {
                _this.router.navigate(['/login']);
            }
        }, function (err) {
            debugger;
            _this.service.ErrorMessage('Error occurred while Signing In');
            _this.invalidPassword = true;
        });
    };
    SignupComponent.prototype.login = function () {
        this.router.navigate(['/home']);
    };
    SignupComponent = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css'],
            providers: [BrainService]
        })
    ], SignupComponent);
    return SignupComponent;
}());
export { SignupComponent };
//# sourceMappingURL=signup.component.js.map