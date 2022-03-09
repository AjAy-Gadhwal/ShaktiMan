import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cricket-card',
  templateUrl: './cricket-card.component.html',
  styleUrls: ['./cricket-card.component.scss']
})
export class CricketCardComponent implements OnInit {

  @Input() isLive: boolean=false;
  @Output() onMatchBidClick = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<string>();
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openMatchScoreModal(): void {
    // const modalRef = this.modalService.open(MatchScoreModalComponent, { modalDialogClass: 'match-score-modal' });
    this.onMatchBidClick.emit();
  }

  onCloseCard(): void {
    this.onClose.emit();
  }
}
