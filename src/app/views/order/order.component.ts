import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../shared/services/product.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  checkoutForm = this.fb.group({
    inputName: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я]+$')]],
    inputLastName: ['', [Validators.required, Validators.pattern('[a-zA-Zа-яА-Я]+$')]],
    inputPhone: ['', [Validators.required, this.phoneValidator('^\\+?[0-9]{11}$')]],
    inputCountry: ['', Validators.required],
    inputIndex: ['', Validators.required],
    inputProduct: ['', Validators.required],
    inputAddress: ['', [Validators.required, this.phoneValidator('^[a-zA-Zа-яА-ЯёЁ0-9\\-\\/ ]+$')]],
    inputComment: [''],
  })
  //Validators.pattern('[a-zA-Zа-яА-Я]+$')]],
  // ^[a-zA-Zа-яА-ЯёЁ0-9\-\/ ]+$
  private subscribption: Subscription | null = null;
  private subscribptionOrder: Subscription | null = null;
  public orderNotSent: boolean = false;
  public formIsView: boolean = true;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute,
              private productService: ProductService, private router: Router) {

  }

  get inputName() {
    return this.checkoutForm.get('inputName');
  }
  get inputLastName() {
    return this.checkoutForm.get('inputLastName');
  }
  get inputPhone() {
    return this.checkoutForm.get('inputPhone');
  }
  get inputCountry() {
    return this.checkoutForm.get('inputCountry');
  }
  get inputIndex() {
    return this.checkoutForm.get('inputIndex');
  }
  get inputProduct() {
    return this.checkoutForm.get('inputProduct');
  }
  get inputAddress() {
    return this.checkoutForm.get('inputAddress');
  }
  get inputComment() {
    return this.checkoutForm.get('inputComment');
  }

  ngOnInit(): void {
    this.subscribption = this.activatedRoute.queryParams.subscribe(params => {
      if (params['product']) {
        this.checkoutForm.patchValue( {inputProduct: params['product']});
      }
    })
  }


  public createOrder() {
    this.orderNotSent = false;
    this.checkoutForm.markAllAsTouched();
    // if (this.checkoutForm.invalid) {
    //   return;
    // }

    this.subscribptionOrder = this.productService.createOrder({
      name: this.inputName?.value || '',
      last_name: this.inputLastName?.value || '',
      phone: this.inputPhone?.value || '',
      country: this.inputCountry?.value || '',
      zip: this.inputIndex?.value || '',
      product: this.inputProduct?.value || '',
      address: this.inputAddress?.value || '',
      comment: this.inputComment?.value || '',
    })
      .subscribe({
        next: (response) => {
          if (response.success && !response.message) {
            alert('Спасибо за заказ')
            this.checkoutForm.reset();
            this.formIsView = false;

          } else {
            console.log(response.message);
            this.orderNotSent = true
          }
        },
        error: (error: string) => {
          console.log('Error!!! in order, ', error)
          this.router.navigate(['/']);
        }
      });

  }



  isFieldInvalid(fieldName: string, isEmpty:boolean = false): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  phoneValidator(pattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const result = new RegExp(pattern).test(control.value);
      if(control.value === '') return null;
      return result ? null : {pattern: {value: control.value}};
    }
  }

  ngOnDestroy(): void {
    this.subscribption?.unsubscribe();
    this.subscribptionOrder?.unsubscribe();
  }

}
