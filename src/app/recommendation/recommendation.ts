import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationDto } from '../../api/models/GetRecommendationsResponseDto';

@Component({
  selector: 'app-recommendation',
  imports: [CommonModule],
  templateUrl: './recommendation.html',
  styleUrl: './recommendation.scss'
})
export class Recommendation {
  @Input() recommendation!: RecommendationDto;
  
  // Handle image loading errors by setting a placeholder
  // console.log is added as a temporary logging mechanism to log image errors during development.
  // Will be replaced by more appropriate logging service as soon as it gets priority
  onImageError(event: Event): void {
    console.log('Failed to load movie poster for:', this.recommendation?.title);
    const img = event.target as HTMLImageElement;
    // Set a placeholder image or hide the image container
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  }
}
