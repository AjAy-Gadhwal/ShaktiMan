import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplaycardsComponent } from './inplaycards.component';

describe('InplaycardsComponent', () => {
  let component: InplaycardsComponent;
  let fixture: ComponentFixture<InplaycardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InplaycardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
