import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkdatabaseComponent } from './networkdatabase.component';

describe('NetworkdatabaseComponent', () => {
  let component: NetworkdatabaseComponent;
  let fixture: ComponentFixture<NetworkdatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkdatabaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkdatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
