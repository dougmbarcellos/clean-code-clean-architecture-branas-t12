import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClientAdapterTesting } from 'src/app/infra/http/testing/http-adapter-provider-testing';
import { getInputElement } from 'src/app/testing/input';
import { CreatePassengerComponent } from './create-passenger.component';

const name = 'Doug';
const email = 'doug@doug.com';
const document = '11144477735';

describe('CreatePassengerComponent', () => {
  let fixture: ComponentFixture<CreatePassengerComponent>;
  let component: CreatePassengerComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  function setInputValuesFromFormGroup() {
    component.formGroup.controls.name.setValue(name);
    component.formGroup.controls.email.setValue(email);
    component.formGroup.controls.document.setValue(document);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreatePassengerComponent, HttpClientTestingModule],
      providers: [provideHttpClientAdapterTesting()],
    });

    fixture = TestBed.createComponent(CreatePassengerComponent);
    component = fixture.componentInstance;

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('botão #btnCreatePassenger deve desabilitar se os campos requeridos não estiverem preenchidos', () => {
    const btnCreatePassenger = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('#btnCreatePassenger')).nativeElement
    );
    expect(btnCreatePassenger.disabled).toBe(true);
  });

  it('preenchimento do formGroup deve refletir no html', () => {
    setInputValuesFromFormGroup();
    expect(getInputElement(fixture, '#name').value).toBe(name);
    expect(getInputElement(fixture, '#email').value).toBe(email);
    expect(getInputElement(fixture, '#document').value).toBe(document);
  });

  // narrow integration test
  it('deve preencher os campos e executar a ação', () => {
    setInputValuesFromFormGroup();
    const btnCreatePassengerDe = fixture.debugElement.query(By.css('#btnCreatePassenger'));
    btnCreatePassengerDe.triggerEventHandler('click');

    const req = httpTestingController.expectOne('/passengers');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name, email, document });

    const responseBody = { passengerId: '123' };
    req.flush(responseBody);

    fixture.detectChanges();

    expect(getInputElement(fixture, '#id').value).toBe(responseBody.passengerId);
  });
});
