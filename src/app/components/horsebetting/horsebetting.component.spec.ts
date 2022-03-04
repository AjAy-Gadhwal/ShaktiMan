import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsebettingComponent } from './horsebetting.component';

describe('HorsebettingComponent', () => {
  let component: HorsebettingComponent;
  let fixture: ComponentFixture<HorsebettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorsebettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsebettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
