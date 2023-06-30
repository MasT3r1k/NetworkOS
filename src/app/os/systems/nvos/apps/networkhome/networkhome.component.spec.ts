import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkappsComponent } from './networkhome.component';

describe('NetworkappsComponent', () => {
  let component: NetworkappsComponent;
  let fixture: ComponentFixture<NetworkappsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkappsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkappsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
