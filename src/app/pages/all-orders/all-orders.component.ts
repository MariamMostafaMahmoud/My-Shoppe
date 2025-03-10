import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { IOrders } from '../../shared/interfaces/iorders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})

export class AllOrdersComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly authService = inject(AuthService);
  Orders: IOrders[] = []


  getAllOrders() {
    const userId = this.authService.userDate?.id;

    if (!userId) {
      console.error('User ID not found!');
      return;
    }

    this.ordersService.getUSerOrders(userId).subscribe({
      next: (res) => {
        console.log('Orders:', res);
        this.Orders = res
        console.log('Orders:', this.Orders);

      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  ngOnInit(): void {
    this.authService.saveUserData();
    this.getAllOrders();
  }
}
