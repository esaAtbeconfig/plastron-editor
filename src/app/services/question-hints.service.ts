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

  getByQuestionId(questionId: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUri}/${questionId}`, {
        responseType: 'text' as 'json',
      });
  }

  get(item: QuestionHints): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseUri}/${item.questionId}`, {
      responseType: 'text' as 'json',
    });
  }

  save(item: QuestionHints): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUri}`, item, {
      responseType: 'text' as 'json',
    });
  }
}
