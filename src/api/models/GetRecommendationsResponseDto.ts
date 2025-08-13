export interface GetRecommendationsResponseDto {
    recommendations: RecommendationDto[];
}

export interface RecommendationDto {
    title: string,
    description: string,
    releaseYear: number,
    posterLink: string
}