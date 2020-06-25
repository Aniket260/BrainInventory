import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BrainService {
baseUrl = environment.URL;
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
    ) { }

// Auth Functions =============================================
  login(post){
    return this.http.post(`${this.baseUrl}/v0.1/login`, post);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    if (localStorage.getItem('token') == 'undefined' || localStorage.getItem('token') === '') {
      return !!localStorage.getItem('0')
    }
    return !!localStorage.getItem('token')
  }

// Product APIS =================================================================

addProduct(product){
  return this.http.post(`${this.baseUrl}/v0.1/addProduct`, product);
}

getAllProduct(){
  return this.http.get(`${this.baseUrl}/v0.1/getAllProduct`);
}

updateProduct(Product){
  return this.http.put(`${this.baseUrl}/v0.1/updateProduct`, Product);
}

deleteProduct(productId){
  return this.http.delete(`${this.baseUrl}/v0.1/deleteProduct?_id=${productId}`);
}


        // tostr notifications

        successMessage(message) {
          this.toastrService.success(message);
        }
        ErrorMessage(message) {
          this.toastrService.error(message);
        }
        infoMessage(message) {
          this.toastrService.info(message);
        }
        warningMessage(message) {
          this.toastrService.warning(message);
        }

}
