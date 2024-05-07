import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePhotUserPage } from './update-phot-user.page';

describe('UpdatePhotUserPage', () => {
  let component: UpdatePhotUserPage;
  let fixture: ComponentFixture<UpdatePhotUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatePhotUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
