import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileVendeurPage } from './profile-vendeur.page';

describe('ProfileVendeurPage', () => {
  let component: ProfileVendeurPage;
  let fixture: ComponentFixture<ProfileVendeurPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileVendeurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
