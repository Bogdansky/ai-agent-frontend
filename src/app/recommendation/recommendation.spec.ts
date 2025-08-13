import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recommendation } from './recommendation';

describe('Recommendation', () => {
  let component: Recommendation;
  let fixture: ComponentFixture<Recommendation>;

  const mockRecommendation = {
    title: 'Test Movie',
    poster: 'test.jpg',
    // add other RecommendationDto fields as needed
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recommendation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recommendation);
    component = fixture.componentInstance;
    component.recommendation = mockRecommendation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set placeholder image and log error on image load failure', () => {
    const event = {
      target: document.createElement('img')
    } as unknown as Event;
    const img = event.target as HTMLImageElement;
    img.src = 'original.jpg';
    spyOn(console, 'log');
    component.onImageError(event);
    expect(img.src.startsWith('data:image/svg+xml;base64')).toBeTrue();
    expect(console.log).toHaveBeenCalledWith('Failed to load movie poster for:', mockRecommendation.title);
  });
});
