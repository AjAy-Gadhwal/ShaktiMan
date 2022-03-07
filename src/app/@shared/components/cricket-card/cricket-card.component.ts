import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchScoreModalComponent } from '../match-score-modal/match-score-modal.component';

@Component({
  selector: 'app-cricket-card',
  templateUrl: './cricket-card.component.html',
  styleUrls: ['./cricket-card.component.scss']
})
export class CricketCardComponent implements OnInit {

  @Input() isLive: boolean=false;
  
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openMatchScoreModal(): void {
    const modalRef = this.modalService.open(MatchScoreModalComponent, { modalDialogClass: 'match-score-modal' });
    modalRef.componentInstance.name = 'World';
  }
}
