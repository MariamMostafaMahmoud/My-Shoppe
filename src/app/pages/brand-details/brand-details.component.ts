import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import {NgxPaginationModule} from 'ngx-pagination'
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-brand-details',
  imports: [NgxPaginationModule,RouterLink,CommonModule],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);

  id!: string
  page: number = 1;
  limit: number = 10;
  brand: string = '?brand='
  total!: number
  Allproducts: Iproduct[] = []
  productWishList: Iproduct[] = []

  getId() {
    this.activatedRoute.paramMap.subscribe(
      {
        next: (p) => {
          this.id = p.get('id')!
          console.log(this.id)
          this.brand = this.id;
          console.log(this.brand)
          this.getProductBrand();
        }
      }
    )
  }
  getProductBrand() {
    this.productService.getAllProducts(this.limit, this.page, this.brand).subscribe({
      next: (res) => {
        this.total = res.results
        this.Allproducts = res.data
        
      }
    })
  }
  chagePage(event: any) {
    this.page = event
    this.getProductBrand()
  }
  // cart
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
  // wishlist
    // wish list
    getWishList() {
      this.wishListService.GetLoggedUserWishlist().subscribe({
        next: (res) => {
          this.productWishList = res.data
          this.markWishlistItems();
          this.wishListService.CountWishList.next(res.count)
  
        }
      })
    }
    markWishlistItems() {
      if (!this.productWishList.length || !this.Allproducts.length) return;
  
      this.Allproducts.forEach(product => {
        product.isFav = this.productWishList.some(wishItem => wishItem.id === product.id);
      });
    }
    toggleWishlist(productId: string) {
      if (this.productWishList.some(wishItem => wishItem.id === productId)) {
        this.wishListService.RemoveProductFromWishList(productId).subscribe({
          next: (res) => {
            console.log(res);
            this.wishListService.CountWishList.next(res.count)
            this.getWishList();
          }
        })
      }
      else {
        this.wishListService.AddProductToWishlist(productId).subscribe({
          next: (res) => {
            console.log(res);
            this.wishListService.CountWishList.next(res.count)
            this.getWishList();
          }
        })
      }
    }
  ngOnInit(): void {
    this.getId()
    this.getProductBrand()
    this.getWishList()
  }
}
