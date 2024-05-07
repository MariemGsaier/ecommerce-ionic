import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListArticleVendeurPage } from './list-article-vendeur.page';

describe('ListArticleVendeurPage', () => {
  let component: ListArticleVendeurPage;
  let fixture: ComponentFixture<ListArticleVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListArticleVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
