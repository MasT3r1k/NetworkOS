import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NvosComponent } from './nvos.component';

describe('NvosComponent', () => {
  let component: NvosComponent;
  let fixture: ComponentFixture<NvosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NvosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NvosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
