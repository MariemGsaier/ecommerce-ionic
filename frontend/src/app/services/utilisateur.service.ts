import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseUrl = 'http://172.16.10.43:5000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  signup(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, user);
  }

  // getProfile(email: string, password: string): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/profile`, { email, password });
  // }

  getProfileById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile/${userId}`);
  }
  updateProfile(userId: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/profile/update/${userId}`;
    return this.http.post<any>(url, updatedData);
  }
  updatePwd(userId: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/profile/update_password/${userId}`;
    return this.http.post<any>(url, updatedData);
  }

  addSeller(seller: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/admin/add_seller`, seller);
  }

  updateSeller(sellerId: number, updatedSeller: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/admin/update_seller/${sellerId}`,
      updatedSeller
    );
  }

  deleteSeller(sellerId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/admin/delete_seller/${sellerId}`
    );
  }

  getSellers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/sellers`);
  }

  getVendeur(sellerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/info_vendeur/${sellerId}`);
  }
  getUser(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userById/${userId}`);
  }

  updateUserPhoto(userId: number, updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/update_user_photo/${userId}`;
    return this.http.put<any>(url, updatedData);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/logout`);
  }
}
