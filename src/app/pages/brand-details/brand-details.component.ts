import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import {NgxPaginationModule} from 'ngx-pagination'


@Component({
  selector: 'app-brand-details',
  imports: [NgxPaginationModule,RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.scss'
})
export class BrandDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productService = inject(ProductService)

  id!: string
  page: number = 1;
  limit: number = 10;
  brand: string = '?brand='
  total!: number
  Allproducts: Iproduct[] = []

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
  ngOnInit(): void {
    this.getId()
    this.getProductBrand()
  }
}
