import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNews } from './history-news';

describe('HistoryNews', () => {
  let component: HistoryNews;
  let fixture: ComponentFixture<HistoryNews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryNews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryNews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
