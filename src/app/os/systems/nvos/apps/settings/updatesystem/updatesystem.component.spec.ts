import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesystemComponent } from './updatesystem.component';

describe('UpdatesystemComponent', () => {
  let component: UpdatesystemComponent;
  let fixture: ComponentFixture<UpdatesystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
