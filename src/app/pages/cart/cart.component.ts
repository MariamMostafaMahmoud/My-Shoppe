import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService);

  CartDetails: ICart = {} as ICart

  getItemsCart() {
    this.cartService.GetLoggedUserCart().subscribe(
      {
        next: (res) => {
          this.CartDetails = res.data
          // console.log(this.CartDetails)
        }
      }
    )
  }
  // remove item
  RemoveItem(id: string) {
    this.cartService.RemoveSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res)
        this.getItemsCart()
        if (res.status === 'success') {
          this.toastr.success('Product deleted successfully!', res.status)
          this.cartService.CartNum.next(res.numOfCartItems)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  // Count
  updateCount(id: string, count: number) {
    this.cartService.UpdateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res)
        this.getItemsCart()
      }
    })
  }
  ClearCart() {
    this.cartService.ClearUserCart().subscribe({
      next: (res) => {
        console.log(res)
        this.getItemsCart()
        this.cartService.CartNum.next(0)
      }
    })
  }
  ngOnInit(): void {
    this.getItemsCart()
    console.log(this.CartDetails)
  }
}
