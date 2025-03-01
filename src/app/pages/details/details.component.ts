import { Iproduct } from './../../shared/interfaces/iproduct';
import { subscribe } from 'diagnostics_channel';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly productService = inject(ProductService)
  private readonly activatedRoute = inject(ActivatedRoute)
  detailsProduct: Iproduct = {} as Iproduct
  getId() {
    this.activatedRoute.paramMap.subscribe(
      {
        next: (p) => {
          let id = p.get('id')
          console.log(id)
          this.productService.getSpecificProduct(id).subscribe(
            {
              next: (res) => {
                this.detailsProduct = res.data
              },
              error: (err) => {
                console.log(err)
              }
            }
          )
        }
      }
    )
  }
  ngOnInit(): void {
    this.getId()
  }
}
