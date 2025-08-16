import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<ProductType[]>([]);
  private currentQuerySubject = new BehaviorSubject<string>('');

  searchResults$: Observable<ProductType[]> = this.searchResultsSubject.asObservable();
  currentQuery$: Observable<string> = this.currentQuerySubject.asObservable();

  constructor(private http: HttpClient) { }

  searching(query: string): Observable<ProductType[]> {
    this.currentQuerySubject.next(query); // Сохраняем текущий запрос
    return this.http.get<ProductType[]>(`https://testologia.ru/tea?search=${encodeURIComponent(query)}`)
      .pipe(
      tap(results => {
        this.searchResultsSubject.next(results); // Сохраняем результаты
      })
    );
  }

  // Метод для очистки результатов
  clearSearch(): void {
    this.searchResultsSubject.next([]);
    this.currentQuerySubject.next('');
  }



  // Observable
  // searching(query: string): Observable<ProductType[]> {
    // const params = new HttpParams().set('search', query);
    // return this.http.get<ProductType[]>('https://testologia.ru/tea', {params});
    // return this.http.get<ProductType[]>('https://testologia.ru/tea?search=' + query);
  // }


}
