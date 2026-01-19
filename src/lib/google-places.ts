/**
 * Google Places API Service (New)
 * Handles searching for businesses and formatting them for the Prospector UI.
 */

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PLACES_API_URL = 'https://places.googleapis.com/v1/places:searchText';

export interface PlaceLead {
    location: string;
    address: string;
    coordinates: string;
    reviews: number;
    stars: number;
    status: string;
    phone?: string;
    website?: string;
    mapsUri?: string;
}

export async function searchLeads(niche: string, location: string): Promise<PlaceLead[]> {
    if (!API_KEY || API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
        throw new Error('Google Places API Key is missing or invalid.');
    }

    const query = `${niche} em ${location}`;

    try {
        const response = await fetch(PLACES_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.currentOpeningHours,places.location,places.websiteUri,places.internationalPhoneNumber,places.googleMapsUri'
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'pt-BR'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to fetch leads');
        }

        const data = await response.json();
        const places = data.places || [];

        return places.map((place: any) => ({
            location: place.displayName?.text || 'Sem Nome',
            address: place.formattedAddress || 'Endereço não disponível',
            coordinates: place.location
                ? `${place.location.latitude.toFixed(4)}° ${place.location.latitude >= 0 ? 'N' : 'S'}, ${place.location.longitude.toFixed(4)}° ${place.location.longitude >= 0 ? 'E' : 'W'}`
                : 'Coordenadas não disponíveis',
            reviews: place.userRatingCount || 0,
            stars: Math.floor(place.rating || 0),
            status: place.currentOpeningHours?.openNow ? "ABERTO AGORA" : "FECHADO",
            phone: place.internationalPhoneNumber,
            website: place.websiteUri,
            mapsUri: place.googleMapsUri
        }));
    } catch (error) {
        console.error('Error searching Google Places:', error);
        throw error;
    }
}
