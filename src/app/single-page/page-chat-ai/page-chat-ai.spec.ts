import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChatAI } from './page-chat-ai';

describe('PageChatAI', () => {
  let component: PageChatAI;
  let fixture: ComponentFixture<PageChatAI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageChatAI]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageChatAI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
