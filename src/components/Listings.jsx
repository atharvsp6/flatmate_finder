import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Wifi, 
  Heart,
  Star,
  Users
} from 'lucide-react';

const mockListings = [
  {
    "id": 1,
    "title": "Modern 2-Bed Apartment in Bandra West",
    "location": "Bandra West, Mumbai",
    "price": 85000,
    "bedrooms": 2,
    "bathrooms": 2,
    "roommates": 1,
    "maxRoommates": 2,
    "images": ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwbXVtYmFpfGVufDF8fHx8MTc5MzU2NzM4Mnww&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "parking", "ac", "furnished"],
    "rating": 4.8,
    "reviews": 18,
    "availableFrom": "September 15, 2025",
    "roomType": "Private Room",
    "description": "Stylish, modern apartment in the heart of Bandra, with great connectivity to the local train station."
  },
  {
    "id": 2,
    "title": "Cozy Bedroom in Shared Andheri Flat",
    "location": "Andheri West, Mumbai",
    "price": 35000,
    "bedrooms": 3,
    "bathrooms": 2,
    "roommates": 2,
    "maxRoommates": 3,
    "images": ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwaW5kaWF8ZW58MXx8fHwxNzkzNTY3Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "furnished", "kitchen"],
    "rating": 4.6,
    "reviews": 11,
    "availableFrom": "October 1, 2025",
    "roomType": "Private Room",
    "description": "Friendly flatshare with young professionals in a bustling part of Andheri, close to cafes and nightlife."
  },
  {
    "id": 3,
    "title": "Spacious Studio in Lower Parel",
    "location": "Lower Parel, Mumbai",
    "price": 60000,
    "bedrooms": 1,
    "bathrooms": 1,
    "roommates": 0,
    "maxRoommates": 1,
    "images": ["https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBhcGFydG1lbnQlMjBraXRjaGVuJTIwaW5kaWF8ZW58MXx8fHwxNzkzNTY3Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "parking", "furnished", "gym"],
    "rating": 4.9,
    "reviews": 22,
    "availableFrom": "September 20, 2025",
    "roomType": "Studio",
    "description": "Modern studio perfect for professionals working in Mumbai's business district."
  },
  {
    "id": 4,
    "title": "Independent House Share in Pune",
    "location": "Koregaon Park, Pune",
    "price": 28000,
    "bedrooms": 4,
    "bathrooms": 3,
    "roommates": 2,
    "maxRoommates": 4,
    "images": ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yJTIwaW5kaWF8ZW58MXx8fHwxNzkzNTY3Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "garden", "furnished"],
    "rating": 4.7,
    "reviews": 25,
    "availableFrom": "October 5, 2025",
    "roomType": "Private Room",
    "description": "Charming house with a garden in a peaceful lane of Koregaon Park."
  },
  {
    "id": 5,
    "title": "Modern Flat with Sea View",
    "location": "Seawoods, Navi Mumbai",
    "price": 55000,
    "bedrooms": 2,
    "bathrooms": 2,
    "roommates": 1,
    "maxRoommates": 2,
    "images": ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiYWxjb255JTIwbXVtYmFpfGVufDF8fHx8MTc5MzU2NzM5MHww&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "parking", "furnished", "gym", "balcony"],
    "rating": 4.8,
    "reviews": 30,
    "availableFrom": "September 10, 2025",
    "roomType": "Private Room",
    "description": "Luxury high-rise apartment with an amazing sea view in Navi Mumbai."
  },
  {
    "id": 6,
    "title": "Shared Room for Students in Dadar",
    "location": "Dadar East, Mumbai",
    "price": 18000,
    "bedrooms": 3,
    "bathrooms": 2,
    "roommates": 4,
    "maxRoommates": 6,
    "images": ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjByb29tJTIwc3R1ZGVudCUyMmluZGlhfGVufDF8fHx8MTc5MzU2NzM5Mnww&ixlib=rb-4.1.0&q=80&w=1080"],
    "amenities": ["wifi", "furnished", "mess"],
    "rating": 4.3,
    "reviews": 9,
    "availableFrom": "October 10, 2025",
    "roomType": "Shared Room",
    "description": "Budget-friendly option for students, located near major colleges and Dadar station."
  }
];

export function Listings() {
  const [listings, setListings] = useState(mockListings);
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    priceRange: [15000, 100000],
    roomType: 'all',
    bedrooms: 'all'
  });
  const [savedListings, setSavedListings] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleSaved = (listingId) => {
    setSavedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         listing.location.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation = filters.location === 'all' || listing.location.includes(filters.location);
    const matchesPrice = listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1];
    const matchesRoomType = filters.roomType === 'all' || listing.roomType.toLowerCase().includes(filters.roomType);
    const matchesBedrooms = filters.bedrooms === 'all' || listing.bedrooms.toString() === filters.bedrooms;

    return matchesSearch && matchesLocation && matchesPrice && matchesRoomType && matchesBedrooms;
  });

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground">Property Listings</h1>
          <p className="text-muted-foreground">Find your perfect flatshare</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by title or location..."
                      className="pl-10"
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Bandra">Bandra</SelectItem>
                      <SelectItem value="Andheri">Andheri</SelectItem>
                      <SelectItem value="Lower Parel">Lower Parel</SelectItem>
                      <SelectItem value="Pune">Pune</SelectItem>
                      <SelectItem value="Navi Mumbai">Navi Mumbai</SelectItem>
                      <SelectItem value="Dadar">Dadar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Price Range (₹/month)</Label>
                <div className="px-3">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => handleFilterChange('priceRange', value)}
                    max={100000}
                    min={15000}
                    step={5000}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.priceRange[0]}</span>
                  <span>₹{filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Room Type and Bedrooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Room Type</Label>
                  <Select value={filters.roomType} onValueChange={(value) => handleFilterChange('roomType', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="private">Private Room</SelectItem>
                      <SelectItem value="shared">Shared Room</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredListings.length} properties found
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative">
                <ImageWithFallback
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                    savedListings.includes(listing.id) ? 'text-red-500' : 'text-muted-foreground'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSaved(listing.id);
                  }}
                >
                  <Heart className={`h-4 w-4 ${savedListings.includes(listing.id) ? 'fill-current' : ''}`} />
                </Button>
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary">{listing.roomType}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground line-clamp-1">{listing.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{listing.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{listing.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{listing.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{listing.roommates}/{listing.maxRoommates}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {listing.amenities.slice(0, 3).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-1">
                      {getAmenityIcon(amenity)}
                      <span className="text-xs text-muted-foreground capitalize">{amenity}</span>
                    </div>
                  ))}
                  {listing.amenities.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{listing.amenities.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-medium text-foreground">₹{listing.price}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <Button asChild size="sm">
                    <Link to={`/listing/${listing.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No properties found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilters({
                search: '',
                location: 'all',
                priceRange: [15000, 100000],
                roomType: 'all',
                bedrooms: 'all'
              })}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}