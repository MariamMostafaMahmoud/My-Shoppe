import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)

  isLogin = input<boolean>(true)
  countCart!: number
  ngOnInit(): void {
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

}
