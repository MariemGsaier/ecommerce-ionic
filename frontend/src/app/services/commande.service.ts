import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private baseUrl = 'http://172.16.10.43:5000/api';

  constructor(private http: HttpClient) {}

  passerCommande(commande: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addOrder`, commande);
  }
}
