import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCardService {
  private apiUrl = 'https://api.scryfall.com/cards/search?q=';

  constructor(private http: HttpClient) { }

  searchCardsName(name: string): Observable<any> {
    return this.http.get(this.apiUrl + name.replace(' ', ''));
  }

  searchNextPage(url: string): Observable<any> {
    return this.http.get(url);
  }

}
