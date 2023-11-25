import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizWelcome: boolean = true;
  quizStart: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    this.quizWelcome = false;
    this.quizStart = true;
  }
}
