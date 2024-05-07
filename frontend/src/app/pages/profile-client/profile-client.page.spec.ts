import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileClientPage } from './profile-client.page';

describe('ProfileClientPage', () => {
  let component: ProfileClientPage;
  let fixture: ComponentFixture<ProfileClientPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
