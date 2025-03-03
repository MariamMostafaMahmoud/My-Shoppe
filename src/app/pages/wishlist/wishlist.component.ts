import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink,CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  private readonly wishListService = inject(WishListService)
  private readonly cartService = inject(CartService);
    private readonly toastr = inject(ToastrService);


  productWishList: Iproduct[] = []


  // add toCart
  AddToCart(id: string) {
    this.cartService.AddProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(res.message, res.status)
          this.cartService.CartNum.next(res.numOfCartItems)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getWishList() {
    this.wishListService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        this.productWishList = res.data
        this.markWishlistItems();
      }
    })
  }
  markWishlistItems() {
    if (!this.productWishList.length ) return;

    this.productWishList.forEach(product => {
      product.isFav = this.productWishList.some(wishItem => wishItem.id === product.id);
    });
  }
  toggleWishlist(productId: string){
    if(this.productWishList.some(wishItem => wishItem.id === productId)){
      this.wishListService.RemoveProductFromWishList(productId).subscribe({
        next:(res)=>{
          console.log(res);
          this.wishListService.CountWishList.next(res.count)
          this.getWishList();
        }
      })
    }
    else{
      this.wishListService.AddProductToWishlist(productId).subscribe({
        next:(res)=>{
          console.log(res);
          this.wishListService.CountWishList.next(res.count)
          this.getWishList();
        }
      })
    }
  }
  ngOnInit(): void {
 
    this.getWishList() 
  }

}
