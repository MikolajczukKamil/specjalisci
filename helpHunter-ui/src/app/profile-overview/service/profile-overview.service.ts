import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Rating {
    comment: string;
    id: number;
    rating: number;
    reviewerId: number;
    reviewerName: string;
    userId: number;
}

export interface Profile {
    avatar: number;
    birthdate: string;
    description: string | null;
    email: string;
    fullname: string;
    id: number;
    isProvidingServices: boolean;
    latitude: number | null;
    longitude: number | null;
    phoneNumber: string | null;
    location: string | null;
    username: string;
}

export interface RatingPayload {
    id: number;
    userId: number;
    reviewerId: number;
    reviewerName: string;
    rating: number;
    comment: string;
}

@Injectable({
    providedIn: 'root',
})
export class ProfileOverviewService {
    private ratingUrl = '/api/Rating';
    private profileUrl = '/api/User';

    constructor(private client: HttpClient) {}

    getRating(id: string) {
        return this.client.get<Rating[]>(this.ratingUrl + '/' + id);
    }

    getProfile(id: string) {
        return this.client.get<Profile>(this.profileUrl + '/' + id);
    }

    sendRating(rating: RatingPayload) {
        console.log(rating);
        return this.client.post<Rating>(this.ratingUrl, rating);
    }
}
