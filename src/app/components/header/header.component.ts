import { Component } from "@angular/core";
import { faHeart, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { BookService } from "src/app/services/book/book.service";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  faHeart: IconDefinition | string = faHeart;

  constructor(private bookService: BookService, private auth: AuthService) {
    console.log("Logged in %c%s", "color: #f2ceb6", auth.loggedIn);
    console.log("User Porfile%c⧭", "color: #00e600", auth.userProfile$);
  }

  searchAuthor(author: string) {
    this.bookService.setAuthor(author);
  }
  handleLoginClick() {
   
    this.auth.login();
    console.log("user",this.auth.getUser$);
  }
  handleLogoutClick() {
    this.auth.logout();
    
  }
}
