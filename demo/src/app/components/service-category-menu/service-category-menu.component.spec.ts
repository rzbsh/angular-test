import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCategoryMenuComponent } from './service-category-menu.component';

describe('ServiceCategoryMenuComponent', () => {
  let component: ServiceCategoryMenuComponent;
  let fixture: ComponentFixture<ServiceCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
