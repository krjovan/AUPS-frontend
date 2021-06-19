import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesTypesComponent } from './admin-articles-types.component';

describe('AdminArticlesTypesComponent', () => {
  let component: AdminArticlesTypesComponent;
  let fixture: ComponentFixture<AdminArticlesTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticlesTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticlesTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
