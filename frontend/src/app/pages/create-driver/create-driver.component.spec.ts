import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClientAdapterTesting } from 'src/app/infra/http/testing/http-adapter-provider-testing';
import { getInputElement } from 'src/app/testing/input';
import { CreateDriverComponent } from './create-driver.component';

const name = 'Doug';
const email = 'doug@doug.com';
const document = '11144477735';
const carPlate = 'ABC1234';

describe('CreateDriverComponent', () => {
  let fixture: ComponentFixture<CreateDriverComponent>;
  let component: CreateDriverComponent;
  let httpTestingController: HttpTestingController;

  function setInputValuesFromFormGroup() {
    component.formGroup.controls.name.setValue(name);
    component.formGroup.controls.email.setValue(email);
    component.formGroup.controls.document.setValue(document);
    component.formGroup.controls.carPlate.setValue(carPlate);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateDriverComponent],
      providers: [provideHttpClientAdapterTesting()],
    });

    fixture = TestBed.createComponent(CreateDriverComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('botão #btnCreateDriver deve desabilitar se os campos requeridos não estiverem preenchidos', () => {
    const btnCreateDriver = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('#btnCreateDriver')).nativeElement
    );
    expect(btnCreateDriver.disabled).toBe(true);
  });

  it('preenchimento do formGroup deve refletir no html', () => {
    setInputValuesFromFormGroup();
    expect(getInputElement(fixture, '#name').value).toBe(name);
    expect(getInputElement(fixture, '#email').value).toBe(email);
    expect(getInputElement(fixture, '#document').value).toBe(document);
    expect(getInputElement(fixture, '#carPlate').value).toBe(carPlate);
  });

  // narrow integration test
  it('deve preencher os campos e executar a ação', async () => {
    setInputValuesFromFormGroup();
    const btnCreateDriverDe = fixture.debugElement.query(By.css('#btnCreateDriver'));
    btnCreateDriverDe.triggerEventHandler('click');

    const req = httpTestingController.expectOne('/drivers');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ name, email, document, carPlate });

    const responseBody = { driverId: '123' };
    req.flush(responseBody);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(getInputElement(fixture, '#id').value).toBe(responseBody.driverId);
  });
});
