import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TimesDirective } from './times.directive';

@Component({
  standalone: true,
  imports: [TimesDirective],
  template: `<div *appTimes="3">item</div>`
})
class TestHostComponent {}

describe('TimesDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();
  });

  it('should render 3 elements', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const elements = fixture.nativeElement.querySelectorAll('div');
    expect(elements.length).toBe(3);
  });
});