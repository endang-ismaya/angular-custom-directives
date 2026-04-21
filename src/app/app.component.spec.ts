import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TimesDirective } from './times.directive';
import { ClassDirective } from './class.directive';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TimesDirective, ClassDirective],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have currentPage as 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentPage).toBe(0);
  });

  it('should have 16 images', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.images.length).toBe(16);
  });
});