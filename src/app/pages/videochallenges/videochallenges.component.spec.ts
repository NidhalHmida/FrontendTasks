import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideochallengesComponent } from './videochallenges.component';

describe('VideochallengesComponent', () => {
  let component: VideochallengesComponent;
  let fixture: ComponentFixture<VideochallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideochallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideochallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
