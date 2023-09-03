import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import RidePositions from 'src/app/domain/ride-positions';
import { provideHttpClientAdapterTesting } from 'src/app/infra/http/testing/http-adapter-provider-testing';
import { CalculateRideComponent } from './calculate-ride.component';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];

describe.only('CalculateRideComponent', () => {
  let component: CalculateRideComponent;
  let fixture: ComponentFixture<CalculateRideComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculateRideComponent],
      providers: [provideHttpClientAdapterTesting()],
    });
    fixture = TestBed.createComponent(CalculateRideComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve fazer o preenchimento dos campos e realizar a requisição para cálculo da corrida', () => {
    window.alert = jest.fn();

    const date = '2013-03-01T01:10:00';
    const positions = component.rideBaseForm.positions;
    positions.at(0).controls.lat.setValue(coordsSaoRoque[0]);
    positions.at(0).controls.long.setValue(coordsSaoRoque[1]);
    positions.at(0).controls.date.setValue(date);

    positions.at(1).controls.lat.setValue(coordsSantaTeresa[0]);
    positions.at(1).controls.long.setValue(coordsSantaTeresa[1]);
    positions.at(1).controls.date.setValue(date);

    const btnCalculateDe = fixture.debugElement.query(By.css('#btnCalculate'));
    btnCalculateDe.triggerEventHandler('click');

    const req = httpTestingController.expectOne('/calculate_ride');
    expect(req.request.method).toEqual('POST');

    const requestBody: RidePositions = {
      positions: [
        {
          lat: coordsSaoRoque[0],
          long: coordsSaoRoque[1],
          date,
        },
        {
          lat: coordsSantaTeresa[0],
          long: coordsSantaTeresa[1],
          date,
        },
      ],
    };

    expect(req.request.body).toEqual(requestBody);

    const responseBody = { price: 10 };
    req.flush(responseBody);
    expect(window.alert).toBeCalledWith(responseBody.price);
  });
});
