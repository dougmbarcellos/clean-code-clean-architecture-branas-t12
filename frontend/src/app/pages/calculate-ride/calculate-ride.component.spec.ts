import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import RidePositions from 'src/app/domain/ride-positions';
import { provideHttpClientAdapter } from 'src/app/infra/http/http-adapter-provider';
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
      providers: [provideHttpClientAdapter(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(CalculateRideComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com dois itens no formArray e não permitir remover segmentos', () => {
    const positions = component.positions;
    expect(positions.length).toBe(2);
    const btnAddSegment = fixture.debugElement.query(By.css('#btnRemoveSegment'));
    expect(btnAddSegment).toBeNull();
  });

  it('deve fazer o preenchimento dos campos e realizar a requisição para cálculo da corrida', () => {
    const date = '2013-03-01T01:10:00';
    const positions = component.positions;
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

    req.flush({ price: 10 });
  });

  it('deve adicionar e remover segmento', () => {
    const positions = component.positions;
    expect(positions.length).toBe(2);

    const btnAddSegment = fixture.debugElement.query(By.css('#btnAddSegment'));
    btnAddSegment.triggerEventHandler('click');
    fixture.detectChanges();
    expect(positions.length).toBe(3);

    const btnRemoveSegment = fixture.debugElement.query(By.css('#btnRemoveSegment'));
    btnRemoveSegment.triggerEventHandler('click');
    fixture.detectChanges();
    expect(positions.length).toBe(2);
  });
});