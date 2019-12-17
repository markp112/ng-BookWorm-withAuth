import { Injectable } from "@angular/core";
import { mockBooks } from "src/assets/data/book-data";
import { IBook } from "../book/book.service";
import { HttpClient } from "@angular/common/http";

interface IEntityBook {
  id: number;
  googleId: string;
  description: string;
  title: string;
  thumbnail: string;
  smallThumbnail: string;
  pageCount: number;
  publishedDate: string;
}

@Injectable({
  providedIn: "root"
})
export class FavouriteService {
  favourites: IBook[] = mockBooks;

  constructor(private httpClient: HttpClient) {}

  getAllBooks(): Promise<IBook[]> {
    return this.httpClient
      .get("http://localhost:8080/api/books")
      .toPromise()
      .then((favs: IEntityBook[]) => {
        const books = favs.map(this.mapEntityToIBook);
        console.log(books);
        return books;
      });
  }

  getBookById(searchId: string): Promise<IBook> {
    return this.httpClient
      .get("http://localhost:8080/api/books/googleid/" + searchId)
      .toPromise()
      .then((fav: IEntityBook) => {
        return this.mapEntityToIBook(fav);
      });
  }

  addBook(book: IBook): Promise<IBook[]> {
    // this.favourites.push(book);
   return this.getAllBooks();
  }

  removeBook(book: IBook): Promise<IBook[]> {
    // const index = this.favourites.indexOf(book);
    // this.favourites.splice(index, 1);
     return this.getAllBooks();
  }

  checkIfFavourite(id: string): boolean {
    return (
      this.favourites.filter((favourite: IBook) => favourite.id === id).length >
      0
    );
  }

  mapEntityToIBook(entityBook: IEntityBook): IBook {
    const {
      title,
      description,
      googleId,
      pageCount,
      publishedDate,
      thumbnail,
      smallThumbnail
    } = entityBook;
    const mappedIBook: IBook = {
      title,
      description,
      publishedDate,
      pageCount,
      id: googleId,
      imageLinks: {
        thumbnail,
        smallThumbnail,
      },
      favourite: true
    };
    return mappedIBook;
  }
}
