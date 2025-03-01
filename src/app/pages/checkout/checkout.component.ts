import {  CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { Iproduct } from '../../shared/interfaces/iproduct';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, FormsModule,CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder)
  private readonly ordersService = inject(OrdersService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService)

  checkOut!: FormGroup
  paymentMethod: string = '';
  CartId: string = ''
  productsOFCart: ICart = {} as ICart

  // CartDetails: ICart = {} as ICart

  getCart() {
    this.cartService.GetLoggedUserCart().subscribe(
      {
        next: (res) => {
          this.productsOFCart =res.data
       
        },
        error: (err) => {
          console.error('❌ Error fetching cart:', err);
        }
      }
    )
  }
  checkForm() {
    this.checkOut = this.formBuilder.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    }
    )
  }
  getIdCart() {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.CartId = param.get('id')!
        console.log(this.CartId)
      }
    })
  }
  submitFormOrder() {
    if (this.paymentMethod === 'visa') {
      this.ordersService.CheckOut(this.checkOut.value, this.CartId).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'success') {
            open(res.session.url, '_self')
          }
        }
      })
    }
    else if (this.paymentMethod === 'cash') {
      this.ordersService.CreateCashOrder(this.checkOut.value, this.CartId).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'success') {
// navgiate 
          }
        }
      })

    }

  }

  ngOnInit(): void {
    this.checkForm()
    this.getIdCart()
    this.getCart()
  }
}
