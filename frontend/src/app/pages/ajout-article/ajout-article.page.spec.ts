import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutArticlePage } from './ajout-article.page';

describe('AjoutArticlePage', () => {
  let component: AjoutArticlePage;
  let fixture: ComponentFixture<AjoutArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjoutArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
