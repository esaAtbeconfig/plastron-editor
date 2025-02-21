import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionHints } from '../models/question-hints';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionHintsService {
  constructor(private httpClient: HttpClient) {}

  baseUri = `${environment.apiUrl}QuestionHints`;

  get(questionId: string): Observable<QuestionHints> {
    return this.httpClient.get<QuestionHints>(`${this.baseUri}/${questionId}`, {
      responseType: 'json',
    });
  }

  save(item: QuestionHints): Observable<QuestionHints> {
    return this.httpClient.post<QuestionHints>(`${this.baseUri}`, item, {
      responseType: 'json',
    });
  }
}
