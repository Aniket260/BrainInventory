import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { BrainService } from 'src/app/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  providers:[BrainService]
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  productDataforEdit: any;
  updateProduct = false;
  constructor(
    public router: Router,
    private service: BrainService,
    private fb: FormBuilder,
  ) {
    debugger;
  this.productDataforEdit = this.router.getCurrentNavigation().extras.state;
    if (this.productDataforEdit) {
      this.updateProduct = true;
    }
   }

  ngOnInit(): void {
        // To initialize FormGroup
        if(this.updateProduct){
          this.productForm = this.fb.group({
            ProductName: [this.productDataforEdit.ProductName, Validators.required],
            Description: [this.productDataforEdit.Description, Validators.required],
            Price: [this.productDataforEdit.Price, Validators.required],
            Quantity: [this.productDataforEdit.Quantity, Validators.required]
          });
        } else{
          this.productForm = this.fb.group({
            ProductName: [null, Validators.required],
            Description: [null, Validators.required],
            Price: [null, Validators.required],
            Quantity: [null, Validators.required]
          });
        }
  }

  addProduct(form: NgForm){
    debugger;
    if (this.updateProduct){
      const Object = {
        _id: this.productDataforEdit._id,
        ProductName: form['ProductName'],
        Description: form['Description'],
        Price: form['Price'],
        Quantity: form['Quantity']
      }
      this.service.updateProduct(Object).subscribe(res=>{
        this.service.successMessage(res['message']);
        this.router.navigate(['/home/product']);
      }, err=>{
        this.service.ErrorMessage(err['message']);
      })
    } else{
      const Object = {
        ProductName: form['ProductName'],
        Description: form['Description'],
        Price: form['Price'],
        Quantity: form['Quantity']
      };
      this.service.addProduct(Object).subscribe(res=>{
        this.service.successMessage(res['message']);
        this.router.navigate(['/home/product']);
      }, err =>{
        this.service.ErrorMessage(err['message']);
      })
    }
  }
  back(){
    this.router.navigate(['/home/product']);
  }
}
