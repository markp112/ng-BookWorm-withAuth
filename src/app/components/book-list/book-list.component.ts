import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { IBook } from "src/app/services/book/book.service";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"]
})
export class BookListComponent implements OnInit {
  @Input() books: IBook[] = [];
  @Output() addToFavourites = new EventEmitter();
  @Output() removeFromFavourites = new EventEmitter();
  @Output() selectBook = new EventEmitter();

  constructor(private auth: AuthService){

  }

  ngOnInit() {
    console.log(this.books);
  }
}
