import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AppComponent', () => {

  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientTestingModule, FormsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Cross Sums Solver' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Cross Sums Solver');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Cross sums solver');
  });

  describe('Grid size input tests', () => {
    it(`should render 'Grid size:' title`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('label')?.textContent).toContain(
        'Grid size:'
      );
    });

    it('should render input box', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('input')).toBeDefined();
    });

    it('should bind input field to gridSize', async () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      component.gridSize = 5;
      fixture.detectChanges(); 

      await fixture.whenStable();

      const compiled = fixture.nativeElement as HTMLElement;
      const input: HTMLInputElement | null = compiled.querySelector('#grid-size-input');

      expect(input).toBeTruthy();
      expect(input!.value).toBe('5');
    })

    it('input field should have min 4 and max 10', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const input: HTMLInputElement = fixture.nativeElement.querySelector('#grid-size-input');

      expect(input.min).toBe('4');
      expect(input.max).toBe('10');
    })

    it('should call changeGridSize() when input changes', () => {
      const fixture = TestBed.createComponent(AppComponent)
      const component = fixture.componentInstance
      spyOn(component, 'changeGridSize')

      const input = fixture.nativeElement.querySelector('#grid-size-input')
      input.value = '5'
      input.dispatchEvent(new Event('input'))

      fixture.detectChanges();

      expect(component.changeGridSize).toHaveBeenCalledWith(4, 10);
    })

  });

  describe('Solve button', () => {
    it('should render solve button', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('button')?.textContent).toContain('Solve');
    });

    it('should call onSolveCLick() on Solve button click', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      spyOn(component, 'onSolveClick')

      const button = fixture.nativeElement.querySelector('.solve-button')
      button.click();

      fixture.detectChanges();

      expect(component.onSolveClick).toHaveBeenCalledWith();
    })
  })
});
