import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductService } from '../../core/services/products/product.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [RouterLink, RouterLinkActive, FormsModule, NgxPaginationModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly products = inject(ProductService);
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);

  AllCategroies: ICategories[] = []
  Allproducts: Iproduct[] = []
  ProductFilter: Iproduct[] = []
  productWishList: Iproduct[] = []

  page: number = 1;
  limit: number = 12;
  total!: number
  searchText: string = ''
  getAllCategroie() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) =>
        this.AllCategroies = res.data
    })
  }
  getAllProducts() {
    this.products.getAllProducts(this.limit, this.page).subscribe(
      {
        next: (res) => {
          this.total = res.results
          this.Allproducts = res.data;
          this.ProductFilter = res.data;


        },
        error: (err) => {
          console.log(err)
        }
      })
  }
  // filter
  SearchProduct() {
    this.ProductFilter = this.Allproducts.filter(product => {
      return product.title.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
  // pagination
  chagePage(event: any) {
    this.page = event
    this.getAllProducts()
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
    this.getAllCategroie()
    this.getAllProducts()
    this.SearchProduct()
    this.getWishList()
  }
}
