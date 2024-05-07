import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private baseUrl = 'http://172.16.10.43:5000/api';

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/seller/add_product`, product);
  }

  getSellerArticles(sellerId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/seller/${sellerId}/articles`);
  }
  getArticles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/articles`);
  }
  getArticlesByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/category/${categoryId}/articles`
    );
  }

  updateProduct(articleId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/seller/update_product/${articleId}`,
      updatedData
    );
  }

  deleteProduct(articleId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/seller/delete_product/${articleId}`
    );
  }

  getArticle(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/info_article/${articleId}`);
  }

  updateProductPhoto(articleId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/seller/update_product_photo/${articleId}`,
      updatedData
    );
  }

  rateArticle(articleId: number, rate: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/rate_article`, {
      article_id: articleId,
      rate,
    });
  }

  getArticleRating(articleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/article/rating/${articleId}`);
  }
}
