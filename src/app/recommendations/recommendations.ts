import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecommendationsService } from '../../services/recommendations.service';
import { RecommendationDto } from '../../api/models/GetRecommendationsResponseDto';
import { GetRecommendationsRequest } from '../../models/get-recommendation.request';
import { Recommendation } from '../recommendation/recommendation';

@Component({
  selector: 'app-recommendations',
  imports: [FormsModule, CommonModule, Recommendation],
  templateUrl: './recommendations.html',
  styleUrl: './recommendations.scss'
})
export class Recommendations {
  private readonly recommendationsService = inject(RecommendationsService);
  
  // Form fields
  mood: string = '';
  genre: string = '';
  language: string = 'english'; // Default to English
  
  // Language options for dropdown
  languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'russian', label: 'Русский' },
    { value: 'belarussian', label: 'Беларуска' },
    { value: 'french', label: 'Français' }
  ];
  
  // Recommendations state
  recommendations: RecommendationDto[] = [];
  isLoading: boolean = false;
  hasSubmitted: boolean = false;
  
  constructor() {
    // Subscribe to recommendations from service
    // Using console.log as a temporary logging mechanism to log things during development. 
    // Will be replaced by more appropriate logging service as soon as it gets priority
    this.recommendationsService.lastRecommendations$.subscribe({
      next: (recommendations: RecommendationDto[]) => {
        console.log('Received recommendations:', recommendations);
        this.recommendations = recommendations;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error receiving recommendations:', error);
        this.isLoading = false;
      }
    });
  }
  
  onSubmit() {
    if (!this.mood.trim() || !this.genre.trim()) {
      console.log('Form validation failed: mood and genre are required');
      return;
    }
    
    console.log('Submitting recommendation request:', { mood: this.mood, genre: this.genre, language: this.language });
    
    this.isLoading = true;
    this.hasSubmitted = true;
    
    const request: GetRecommendationsRequest = {
      mood: this.mood.trim(),
      genre: this.genre.trim(),
      language: this.language
    };
    
    this.recommendationsService.getRecommendation(request);
  }
  
  onReset() {
    console.log('Resetting form and recommendations');
    this.mood = '';
    this.genre = '';
    this.language = 'english';
    this.recommendations = [];
    this.hasSubmitted = false;
    this.isLoading = false;
  }
  
  // TrackBy function for ngFor optimization
  // Using trackBy to improve performance when rendering recommendation lists
  trackByTitle(index: number, item: RecommendationDto): string {
    return item.title;
  }
}
