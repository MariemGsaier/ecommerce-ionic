import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EvaluateArticlePage } from './evaluate-article.page';

describe('EvaluateArticlePage', () => {
  let component: EvaluateArticlePage;
  let fixture: ComponentFixture<EvaluateArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EvaluateArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
