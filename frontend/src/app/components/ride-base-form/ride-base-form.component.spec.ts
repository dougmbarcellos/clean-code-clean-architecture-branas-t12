import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { getInputElement } from 'src/app/testing/input';
import { RideBaseFormComponent } from './ride-base-form.component';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

describe('RideBaseFormComponent', () => {
  let component: RideBaseFormComponent;
  let fixture: ComponentFixture<RideBaseFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RideBaseFormComponent],
    });
    fixture = TestBed.createComponent(RideBaseFormComponent);
    component = fixture.componentInstance;
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

  it('deve fazer o preenchimento dos campos através do FormControl', () => {
    const date = '2013-03-01T01:10:01';
    component.positions.at(0).controls.lat.setValue(coordsSaoRoque[0]);
    component.positions.at(0).controls.long.setValue(coordsSaoRoque[1]);
    component.positions.at(0).controls.date.setValue(date);

    component.positions.at(1).controls.lat.setValue(coordsSantaTeresa[0]);
    component.positions.at(1).controls.long.setValue(coordsSantaTeresa[1]);
    component.positions.at(1).controls.date.setValue(date);

    const renderedInputsIdList = ['lat-0', 'long-0', 'date-0', 'lat-1', 'long-1', 'date-1'];

    renderedInputsIdList.forEach((inputId) => {
      const input = getInputElement(fixture, `#${inputId}`);
      expect(input.value).toBeTruthy();
      type Indexes = '0' | '1';
      type Fields = 'lat' | 'long' | 'date';
      const [name, index] = <[Fields, Indexes]>inputId.split('-');
      const inputControl = component.positions.at(parseInt(index)).controls[name];

      if (name === 'date') {
        const date = new Date(input.value);
        date.setTime(date.getTime() - date.getTimezoneOffset() * 60000); // Remove o timezone.
        const formattedInputValue = date.toISOString().replace('.000Z', '');
        expect(formattedInputValue).toBe(inputControl.value);
      } else {
        expect(input.value).toBe(inputControl.value?.toString());
      }
    });
  });

  it('deve adicionar e remover percurso', () => {
    expect(component.positions.length).toBe(2);

    const btnAddSegment = fixture.debugElement.query(By.css('#btnAddSegment'));
    btnAddSegment.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.positions.length).toBe(3);

    const btnRemoveSegment = fixture.debugElement.query(By.css('#btnRemoveSegment'));
    btnRemoveSegment.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.positions.length).toBe(2);
  });
});
