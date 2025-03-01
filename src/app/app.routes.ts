import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // auth layout
    {
        path: '', component: AuthLayoutComponent,
        canActivate: [logedGuard]
        , children: [
            { path: 'login', component: LoginComponent, title: 'Sign In' },
            {
                path: 'Signup', component: RegisterComponent, title: 'Sign Up'

            }, {
                path: 'Forget', component: ForgetPasswordComponent, title: 'Forget'

            },

        ]
    },
    // blank layout 
    {
        path: '', component: BlankLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent), title: 'Home' },
            { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent), title: 'Cart' },
            { path: 'details/:id', loadComponent: () => import('./pages/details/details.component').then((c) => c.DetailsComponent), title: 'Details' },
            { path: 'products', loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent), title: 'Products' },
            { path: 'brands', loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent), title: 'Brands' },
            { path: 'categories', loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent), title: 'Categories' },
            { path: 'checkout/:id', loadComponent: () => import('./pages/checkout/checkout.component').then((c) => c.CheckoutComponent), title: 'Check Out' },
            { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist.component').then((c) => c.WishlistComponent), title: 'wish List' },
            { path: 'brandDetails/:id', loadComponent: () => import('./pages/brand-details/brand-details.component').then((c) => c.BrandDetailsComponent), title: 'brand Details' },
            { path: 'allorders', loadComponent: () => import('./pages/all-orders/all-orders.component').then((c) => c.AllOrdersComponent), title: 'All Orders' },
            { path: '**', component: NotfoundComponent, title: 'Notfound' },
        ]
    },

];
