import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatGridListModule,
  MatExpansionModule,
  MatTableModule,
  MatToolbarModule,
  MatSelectModule,
  MatSortModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatDialogModule,
  MatInputModule}  from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { StocksComponent } from './components/stocks/stocks.component';
import { ArticleComponent } from './components/article/article.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { AdminStocksComponent } from './components/admin/admin-stocks/admin-stocks.component';
import { AdminArticlesComponent } from './components/admin/admin-articles/admin-articles.component';
import { AdminArticlesTypesComponent } from './components/admin/admin-articles-types/admin-articles-types.component';
import { AdminArticleDeliveryComponent } from './components/admin/admin-article-delivery/admin-article-delivery.component';
import { AdminSupplierComponent } from './components/admin/admin-supplier/admin-supplier.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AdminAuthGuardService] },
  { path: 'adminpanel', component: AdminpanelComponent, canActivate: [AdminAuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'stocks', component: StocksComponent, canActivate: [AuthGuardService] },
  { path: 'myorder', component: MyOrdersComponent, canActivate: [AuthGuardService] },
  { path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    ProfileComponent,
    RegisterComponent,
    UsersComponent,
    StocksComponent,
    ArticleComponent,
    AdminpanelComponent,
    AdminStocksComponent,
    AdminArticlesComponent,
    AdminArticlesTypesComponent,
    AdminArticleDeliveryComponent,
    AdminSupplierComponent,
    AdminOrdersComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      closeButton: true,
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
