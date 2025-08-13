import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recommendations } from './recommendations';

import { RecommendationsService } from '../../services/recommendations.service';
import { BehaviorSubject } from 'rxjs';

describe('Recommendations', () => {
  let component: Recommendations;
  let fixture: ComponentFixture<Recommendations>;

  let mockService: jasmine.SpyObj<RecommendationsService>;
  let recommendations$: BehaviorSubject<any[]>;

  beforeEach(async () => {
    recommendations$ = new BehaviorSubject<any[]>([]);
    mockService = jasmine.createSpyObj('RecommendationsService', ['getRecommendation'], {
      lastRecommendations$: recommendations$.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [Recommendations],
      providers: [{ provide: RecommendationsService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Recommendations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if mood or genre is empty', () => {
    spyOn(console, 'log');
    component.mood = '';
    component.genre = '';
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Form validation failed: mood and genre are required');
    expect(mockService.getRecommendation).not.toHaveBeenCalled();
  });

  it('should call service and set loading on valid submit', () => {
    spyOn(console, 'log');
    component.mood = 'happy';
    component.genre = 'comedy';
    component.language = 'english';
    component.onSubmit();
    expect(component.isLoading).toBeTrue();
    expect(component.hasSubmitted).toBeTrue();
    expect(mockService.getRecommendation).toHaveBeenCalledWith({ mood: 'happy', genre: 'comedy', language: 'english' });
    expect(console.log).toHaveBeenCalledWith('Submitting recommendation request:', { mood: 'happy', genre: 'comedy', language: 'english' });
  });

  it('should reset form and state on onReset', () => {
    spyOn(console, 'log');
    component.mood = 'sad';
    component.genre = 'drama';
    component.language = 'french';
    component.recommendations = [{ title: 'test' } as any];
    component.hasSubmitted = true;
    component.isLoading = true;
    component.onReset();
    expect(component.mood).toBe('');
    expect(component.genre).toBe('');
    expect(component.language).toBe('english');
    expect(component.recommendations).toEqual([]);
    expect(component.hasSubmitted).toBeFalse();
    expect(component.isLoading).toBeFalse();
    expect(console.log).toHaveBeenCalledWith('Resetting form and recommendations');
  });

  it('trackByTitle should return item title', () => {
    const item = { title: 'movie' } as any;
    expect(component.trackByTitle(0, item)).toBe('movie');
  });

  it('should update recommendations and loading state on service next', () => {
    const recs = [{ title: 'A' }, { title: 'B' }];
    component.isLoading = true;
    spyOn(console, 'log');
    recommendations$.next(recs as any);
    expect(component.recommendations).toEqual(recs as any);
    expect(component.isLoading).toBeFalse();
    expect(console.log).toHaveBeenCalledWith('Received recommendations:', recs as any);
  });

  it('should set loading false and log error on service error', () => {
    component.isLoading = true;
    spyOn(console, 'error');
    // Simulate error by calling error on the subject
    recommendations$.error('fail');
    expect(component.isLoading).toBeFalse();
    expect(console.error).toHaveBeenCalled();
  });
});
