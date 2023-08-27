import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemArticleVenteComponent } from './item-article-vente.component';

describe('ItemArticleVenteComponent', () => {
  let component: ItemArticleVenteComponent;
  let fixture: ComponentFixture<ItemArticleVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemArticleVenteComponent]
    });
    fixture = TestBed.createComponent(ItemArticleVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
