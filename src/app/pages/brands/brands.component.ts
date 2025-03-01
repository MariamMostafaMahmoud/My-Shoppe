import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { IBrands } from '../../shared/interfaces/ibrands';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService)
  private readonly router = inject(Router)

  brands: IBrands[] = []


  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data
      }
    })
  }

  ngOnInit(): void {
    this.getAllBrands()
  }
}
