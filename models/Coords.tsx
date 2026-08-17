type Coords = {
    city: string | null,
    district: string | null,
    streetNumber: string | null,
    street: string | null,
    region: string | null,      // e.g. "Casablanca-Settat"
    subregion: string | null,
    country: string | null,
    postalCode: string | null,
    name: string | null,        // sometimes the most human-readable label
    isoCountryCode: string | null,
    timezone: string | null,    // Android only, sometimes null
};

export default Coords