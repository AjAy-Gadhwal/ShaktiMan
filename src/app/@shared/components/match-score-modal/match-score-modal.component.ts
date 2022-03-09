import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-match-score-modal',
  templateUrl: './match-score-modal.component.html',
  styleUrls: ['./match-score-modal.component.scss']
})
export class MatchScoreModalComponent implements OnInit {

  @Output() onClose = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onCloseModal(): void {
    this.onClose.emit();
  }
}
