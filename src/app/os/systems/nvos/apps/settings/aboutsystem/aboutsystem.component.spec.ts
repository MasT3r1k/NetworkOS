import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsystemComponent } from './aboutsystem.component';

describe('AboutsystemComponent', () => {
  let component: AboutsystemComponent;
  let fixture: ComponentFixture<AboutsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutsystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
