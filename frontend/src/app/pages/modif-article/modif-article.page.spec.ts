import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifArticlePage } from './modif-article.page';

describe('ModifArticlePage', () => {
  let component: ModifArticlePage;
  let fixture: ComponentFixture<ModifArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
