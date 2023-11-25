import { Injectable } from '@angular/core';
import { environment as ENV } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = ENV.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizList: any;
  constructor(private http: HttpClient) { 

  }

  startQuiz(): Observable<any>{
    return this.http.get(`${baseUrl}/quiz/startQuiz`);
  }
  
  submitQuiz(selected: any): Observable<any>{
    return this.http.post(`${baseUrl}/quiz/submitQuiz`, selected);
  }

  setQuiz(quiz: any): void{
    this.quizList = quiz; 
  }

  getQuiz(): Observable<any>{
    return this.quizList; 
  }
}
