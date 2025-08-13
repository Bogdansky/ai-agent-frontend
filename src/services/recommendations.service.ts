import { inject, Injectable } from "@angular/core";
import { RecommendationApi } from "../api/recommendations.api";
import { GetRecommendationsRequest } from "../models/get-recommendation.request";
import { BehaviorSubject, Observable } from "rxjs";
import { RecommendationDto } from "../api/models/GetRecommendationsResponseDto";

@Injectable({
    providedIn: 'root'
})
export class RecommendationsService {
    private readonly api = inject(RecommendationApi);
    private lastRecommendations = new BehaviorSubject<RecommendationDto[]>([]);

    // Expose observable for components to subscribe to
    // Using BehaviorSubject to ensure components get the latest recommendations even if they subscribe after the API call
    get lastRecommendations$(): Observable<RecommendationDto[]> {
        return this.lastRecommendations.asObservable();
    }

    getRecommendation(req: GetRecommendationsRequest) {
        // console.log is added as a temporary logging mechanism to log API calls during development. 
        // Will be replaced by more appropriate logging service as soon as it gets priority
        console.log('Making API call for recommendations:', req);
        
        this.api
            .getRecommendations({...req})
            .subscribe({
                next: (val) => {
                    console.log('API response received:', val);
                    this.lastRecommendations.next(val.recommendations);
                },
                error: (err) => {
                    console.error('API call failed:', err);
                    // Reset to empty array on error to clear previous recommendations
                    this.lastRecommendations.next([]);
                }
            });
    }
}