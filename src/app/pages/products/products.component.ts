import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductService } from '../../core/services/products/product.service';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
@Component({
  selector: 'app-products',
  imports: [RouterLink, RouterLinkActive, FormsModule,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly products = inject(ProductService);

  AllCategroies: ICategories[] = []
  Allproducts: Iproduct[] = []
  ProductFilter: Iproduct[] = []
  page: number = 1;
  limit: number = 10;
  total!: number
  searchText: string = ''
  getAllCategroie() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) =>
        this.AllCategroies = res.data
    })
  }
  getAllProducts() {
    this.products.getAllProducts( this.limit,this.page).subscribe(
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
    this.ProductFilter = this.ProductFilter.filter(product => {
      console.log(product.title); // عشان نتأكد إنه بيوصل للفلترة
      return product.title.toLowerCase().includes(this.searchText.toLowerCase());
    });
    console.log(this.ProductFilter); // هتشوفي النتيجة بعد الفلترة
  }
  // pagination
  chagePage(event: any) {
    this.page = event
    this.getAllProducts() 
  }

  ngOnInit(): void {
    this.getAllCategroie()
    this.getAllProducts()
    this.SearchProduct()
  }
}
