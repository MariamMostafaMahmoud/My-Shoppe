import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { subscribe } from 'diagnostics_channel';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { SliderComponent } from "../../shared/components/ui/slider/slider.component";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SliderComponent, RouterLink, CarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    // navText: ['',''] ,
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
  private readonly products = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  private readonly brandsService = inject(BrandsService);
  private readonly wishListService = inject(WishListService);


  AllBrands: IBrands[] = []
  Allproducts: Iproduct[] = []
  isFav: boolean = false
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands()
  }

  getAllProducts() {
    this.products.getAllProducts().subscribe(
      {
        next: (res) => {
          this.Allproducts = res.data;
          console.log(this.Allproducts)
        },
        error: (err) => {
          console.log(err)
        }
      })

  }
  // add cart
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
  // show brands
  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.AllBrands = res.data
      }
    })
  }

  // wish list
  toggleFav() {
    // this.isFav = true
    // this.wishListService.AddProductToWishlist(id).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   }
    // })
    this.isFav = !this.isFav;
  }
}
