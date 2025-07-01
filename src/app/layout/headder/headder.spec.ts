import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headder } from './headder';

describe('Headder', () => {
  let component: Headder;
  let fixture: ComponentFixture<Headder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Headder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
