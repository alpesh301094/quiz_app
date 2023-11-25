import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizWelcome: boolean = true;
  quizStart: boolean = false;
  quizPageLoader: boolean = false;
  quizArr: any = {};
  quizList: any;
  questionPointer: number = 0;
  quizPercent: number = 0;
  showResultObj: any = {};
  showResult: boolean = false;
  selectedQustion: string = "";
  selectedOption: string = "";
  selectedQustionOption: any = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
  }

  startQuiz(){
    this.quizWelcome = false;
    this.quizStart = true;
    this.quizPageLoader = true;
    this.quizService.startQuiz().subscribe((res) => {
      this.quizPageLoader = false;
      this.quizService.setQuiz(res.data)
      this.quizArr = this.quizService.getQuiz()
      this.quizList = this.quizArr[this.questionPointer] 
    }, (err) => {
      this.quizPageLoader = false;
      console.log(err);
    })
  }

  nextQuestion(){
    if(!this.selectedOption){
      alert("Please select option");
      return;
    }
    this.questionPointer++;
    this.quizPercent = this.questionPointer / this.quizArr.length * 100;

    this.selectedOption = "";
    if(this.questionPointer == this.quizArr.length){
      this.quizPageLoader = true;
      this.quizService.submitQuiz(this.selectedQustionOption).subscribe(res => {
        this.quizPageLoader = false;
        this.showResultObj = res;
      },err => {
        this.quizPageLoader = false;
        console.log(err);
      })
      this.showResult = true;
    }else{
      this.quizList = this.quizArr[this.questionPointer]
    }
  }

  selectOption(questionId: string, optionId: string){
    // console.log(questionId, optionId);
    this.selectedOption = optionId;
    this.upsert(this.selectedQustionOption, {
      question_id: questionId,
      option_id: optionId
    })    
  }

  upsert(array: any[], element: { question_id: any;option_id: any; }) { // (1)
    const i = array.findIndex(_element => _element.question_id === element.question_id);
    if (i > -1) array[i] = element; // (2)
    else array.push(element);
  }
}
