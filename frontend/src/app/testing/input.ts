import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function getInputElement(fixture: ComponentFixture<any>, selector: string) {
  return <HTMLInputElement>fixture.debugElement.query(By.css(selector)).nativeElement;
}
