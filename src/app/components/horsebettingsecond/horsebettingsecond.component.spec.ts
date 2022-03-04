import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorsebettingsecondComponent } from './horsebettingsecond.component';

describe('HorsebettingsecondComponent', () => {
  let component: HorsebettingsecondComponent;
  let fixture: ComponentFixture<HorsebettingsecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorsebettingsecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorsebettingsecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
