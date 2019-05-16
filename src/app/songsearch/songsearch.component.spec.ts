import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsearchComponent } from './songsearch.component';

describe('SongsearchComponent', () => {
  let component: SongsearchComponent;
  let fixture: ComponentFixture<SongsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
