import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GetRecommendationsRequestDto } from "./models/GetRecommendationsRequestDto";
import { GetRecommendationsResponseDto } from "./models/GetRecommendationsResponseDto";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecommendationApi {
    private readonly httpClient = inject(HttpClient);
    private readonly apiUrl = "http://localhost:5097/recommendations";

    getRecommendations(request: GetRecommendationsRequestDto): Observable<GetRecommendationsResponseDto> {
        return this.httpClient.post<GetRecommendationsResponseDto>(this.apiUrl, request).pipe(
            catchError((err) => {
                console.error('Ошибка при запросе рекомендации', err);
                return throwError(() => err);
            })
        );
    }
}