import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrainService } from 'src/app/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [BrainService]
})
export class ProductListComponent implements OnInit {

productList: any = [];

  constructor(
    private router: Router,
    private service: BrainService
  ) { }

  ngOnInit(): void {
    this.service.getAllProduct().subscribe(res => {
      this.productList = res['ProductList'];
    }, err => {
      this.service.ErrorMessage(err['message']);
    });
  }

  edit(product){
    this.router.navigate(['/home/productform'], { state: product });
  }

  Delete(product){
    this.service.deleteProduct(product._id).subscribe(res => {
      this.service.successMessage(res['message']);
      this.ngOnInit();
    }, err => {
      this.service.ErrorMessage(err['message']);
    });
  }

  addProduct(){
    this.router.navigate(['/home/productform']);
  }
}
