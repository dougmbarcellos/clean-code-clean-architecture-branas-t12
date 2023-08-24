import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreateDriverComponent } from './create-driver.component';

describe('CreateDriverComponent', () => {
  let fixture: ComponentFixture<CreateDriverComponent>;
  let component: CreateDriverComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateDriverComponent, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(CreateDriverComponent);
    component = fixture.componentInstance;

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // narrow
  it('deve preencher os campos e executar a ação', async () => {
    component.formGroup.controls.name.setValue('Doug');
    component.formGroup.controls.email.setValue('doug@doug.com');
    component.formGroup.controls.document.setValue('11144477735');
    const btnCreateDriverDe = fixture.debugElement.query(By.css('#btnCreateDriver'));
    btnCreateDriverDe.triggerEventHandler('click');

    const req = httpTestingController.expectOne('http://localhost:3000/drivers');
    expect(req.request.method).toEqual('POST');

    const requestBody = { driverId: '123' };
    req.flush(requestBody);

    await fixture.whenStable();
    fixture.detectChanges();

    const inputIdDe = fixture.debugElement.query(By.css('#id'));
    expect(inputIdDe.nativeElement.value).toBe(requestBody.driverId);
  });
});
