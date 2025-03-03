import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishListService = inject(WishListService)


  isLogin = input<boolean>(true)
  countCart!: number
  countWishList!: number
  // get Count Cart
  getCountCart() {
    this.cartService.CartNum.subscribe({
      next: (value) => {
        this.countCart = value
      }
    })
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.CartNum.next(res.numOfCartItems)
      }
    })
  }
  // get Count Wish list
  getCountWishList() {
    this.wishListService.CountWishList.subscribe({
      next: (value) => {
        this.countWishList = value
      }
    })
    this.wishListService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
       this.wishListService.CountWishList.next(res.count)
      }
    })
  }
  ngOnInit(): void {
    this.getCountCart()
    this.getCountWishList() 
  }
}
