import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { CreatePassengerComponent } from './create-passenger.component';

describe('CreatePassengerComponent', () => {
  let fixture: ComponentFixture<CreatePassengerComponent>;
  let component: CreatePassengerComponent;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreatePassengerComponent, HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(CreatePassengerComponent);
    component = fixture.componentInstance;

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o campo id', () => {
    const inputDe = fixture.debugElement.query(By.css('#id'));
    expect(inputDe.nativeElement).toBeDefined();
  });

  it('deve renderizar o campo nome', () => {
    const inputDe = fixture.debugElement.query(By.css('#name'));
    expect(inputDe.nativeElement).toBeDefined();
  });

  it('deve renderizar o campo email', () => {
    const inputDe = fixture.debugElement.query(By.css('#email'));
    expect(inputDe.nativeElement).toBeDefined();
  });

  it('deve renderizar o campo Documento', () => {
    const inputDe = fixture.debugElement.query(By.css('#document'));
    expect(inputDe.nativeElement).toBeDefined();
  });

  it('deve renderizar o botão Cadastrar Passageiro', () => {
    const buttonDe = fixture.debugElement.query(By.css('#btnCreatePassenger'));
    expect(buttonDe.nativeElement).toBeDefined();
  });

  // narrow
  it('deve preencher os campos e executar a ação', async () => {
    component.formGroup.controls.name.setValue('Doug');
    component.formGroup.controls.email.setValue('doug@doug.com');
    component.formGroup.controls.document.setValue('11144477735');
    const btnCreatePassengerDe = fixture.debugElement.query(By.css('#btnCreatePassenger'));
    btnCreatePassengerDe.triggerEventHandler('click');
    const req = httpTestingController.expectOne('http://localhost:3000/passengers');
    expect(req.request.method).toEqual('POST');
    const requestBody = { passengerId: '123' };
    req.flush(requestBody);
    await fixture.whenStable();
    fixture.detectChanges();
    const inputIdDe = fixture.debugElement.query(By.css('#id'));
    expect(inputIdDe.nativeElement.value).toBe(requestBody.passengerId);
  });
});
