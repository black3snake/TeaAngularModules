import {Component, OnInit} from '@angular/core';
import {QuestionsType} from "../../../../types/questions.type";
import {AnswersDbService} from "../../../shared/services/answers-db.service";

@Component({
  selector: 'answers-component',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  public answers: QuestionsType[] = [];

  constructor(private answersDb: AnswersDbService) {  }
  ngOnInit(): void {
    this.answers = this.answersDb.getQuestion();
  }



}
