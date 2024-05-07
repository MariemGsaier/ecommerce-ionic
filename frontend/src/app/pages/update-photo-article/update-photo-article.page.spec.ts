import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhotoArticlePage } from './update-photo-article.page';

describe('UpdatePhotoArticlePage', () => {
  let component: UpdatePhotoArticlePage;
  let fixture: ComponentFixture<UpdatePhotoArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePhotoArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
