import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-match-score-modal',
  templateUrl: './match-score-modal.component.html',
  styleUrls: ['./match-score-modal.component.scss']
})
export class MatchScoreModalComponent implements OnInit {

  @Input() name='';

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
