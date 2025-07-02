import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdDashboard } from './prod-dashboard';

describe('ProdDashboard', () => {
  let component: ProdDashboard;
  let fixture: ComponentFixture<ProdDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
