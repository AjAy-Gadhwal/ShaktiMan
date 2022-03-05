import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchcardsComponent } from './matchcards.component';

describe('MatchcardsComponent', () => {
  let component: MatchcardsComponent;
  let fixture: ComponentFixture<MatchcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
