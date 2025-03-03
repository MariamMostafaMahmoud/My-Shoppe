import { Iproduct } from './../../shared/interfaces/iproduct';
import { subscribe } from 'diagnostics_channel';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly productService = inject(ProductService)
  private readonly activatedRoute = inject(ActivatedRoute)
    private readonly cartService = inject(CartService);
      private readonly toastr = inject(ToastrService);
    
  detailsProduct: Iproduct = {} as Iproduct

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
