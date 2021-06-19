import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleDeliveryComponent } from './admin-article-delivery.component';

describe('AdminArticleDeliveryComponent', () => {
  let component: AdminArticleDeliveryComponent;
  let fixture: ComponentFixture<AdminArticleDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticleDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticleDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
