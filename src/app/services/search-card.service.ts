import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutputCardList } from '../models/OutputCardList';
import { ScryfallApiResponse } from '../models/OutputApiResponseSearchCard';

@Injectable({
  providedIn: 'root'
})
export class SearchCardService {
  private apiUrl = 'https://api.scryfall.com/cards/search?q=';
  private apiUrlUniqueVersion = '+include%3Aextras&unique=prints'

  constructor(private http: HttpClient) { }

  searchCardsName(name: string): Observable<ScryfallApiResponse> {
    return this.http.get<ScryfallApiResponse>(this.apiUrl + name.replace(' ', ''));
  }

  searchUrl(url: string): Observable<ScryfallApiResponse> {
    return this.http.get<ScryfallApiResponse>(url);
  }

  searchVersionCard(name: string): Observable<ScryfallApiResponse> {
    return this.http.get<ScryfallApiResponse>(this.apiUrl + '!"' + name.replace(' ', '') + '"' + this.apiUrlUniqueVersion);
  }

}
