import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrubComponent } from './grub.component';

describe('GrubComponent', () => {
  let component: GrubComponent;
  let fixture: ComponentFixture<GrubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
