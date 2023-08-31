import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { HttpClientService } from 'src/app/infra/http/http-client.service';
import { CreatePassengerComponent } from './create-passenger.component';

const name = 'Doug';
const email = 'doug@doug.com';
const document = '11144477735';

describe.only('CreatePassengerComponent', () => {
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
      providers: [{ provide: HttpClientService, useClass: HttpClient }],
    });

    fixture = TestBed.createComponent(CreatePassengerComponent);
    component = fixture.componentInstance;

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('botão #btnCreatePassenger deve desabilitar se os campos requeridos não estiverem preenchidos', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const btnCreatePassenger = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('#btnCreatePassenger')).nativeElement
    );
    expect(btnCreatePassenger.disabled).toBe(true);
  });

  it('preenchimento do formGroup deve refletir no html', () => {
    setInputValuesFromFormGroup();
    fixture.detectChanges();
    const nameInput = <HTMLInputElement>fixture.debugElement.query(By.css('#name')).nativeElement;
    expect(nameInput.value).toBe(name);
    const emailInput = <HTMLInputElement>fixture.debugElement.query(By.css('#email')).nativeElement;
    expect(emailInput.value).toBe(email);
    const documentInput = <HTMLInputElement>(
      fixture.debugElement.query(By.css('#document')).nativeElement
    );
    expect(documentInput.value).toBe(document);
  });

  // narrow integration test
  it('deve preencher os campos e executar a ação', async () => {
    setInputValuesFromFormGroup();
    const btnCreatePassengerDe = fixture.debugElement.query(By.css('#btnCreatePassenger'));
    btnCreatePassengerDe.triggerEventHandler('click');

    const req = httpTestingController.expectOne('/passengers');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name, email, document });

    const responseBody = { passengerId: '123' };
    req.flush(responseBody);

    await fixture.whenStable();
    fixture.detectChanges();

    const inputId = <HTMLInputElement>fixture.debugElement.query(By.css('#id')).nativeElement;
    expect(inputId.value).toBe(responseBody.passengerId);
  });
});
