import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultitaskComponent } from './multitask.component';

describe('MultitaskComponent', () => {
  let component: MultitaskComponent;
  let fixture: ComponentFixture<MultitaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultitaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultitaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
