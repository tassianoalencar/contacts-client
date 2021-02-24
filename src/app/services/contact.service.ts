import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ContactForm } from '../models/contactform.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = 'http://localhost:8080/api/v1/contacts';

  constructor(private http: HttpClient) { }

  getAll(params): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(data: ContactForm): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
