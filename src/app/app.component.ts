import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SellerService } from './services/seller.service';
import { ProductService } from './services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule , FontAwesomeModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [SellerService , ProductService , UserService],
})
export class AppComponent {
  title = 'angular_ecommerce';

  constructor(private seller : SellerService){

  }

  ngOnInit() : void{
    this.seller.reloadSeller()
  }
}
