import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { 
  Search, 
  MapPin, 
  Calendar,
  Heart,
  Star,
  Users,
  MessageSquare,
  Filter,
  Clock
} from 'lucide-react';

const mockRoommates = [
  {
    "id": 1,
    "name": "Priya Sharma",
    "age": 26,
    "occupation": "Marketing Manager",
    "bio": "Friendly professional looking for a clean, social flatmate. Love cooking and exploring cafes on weekends!",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3OTM1Njc2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "location": "Bandra, Mumbai",
    "budget": [30000, 45000],
    "moveInDate": "2025-10-01",
    "roomType": "Private Room",
    "lifestyle": {
      "cleanliness": 4,
      "socialLevel": 4,
      "smoking": false,
      "pets": false
    },
    "interests": ["Cooking", "Yoga", "Reading", "Travel"],
    "rating": 4.8,
    "responseRate": 95,
    "lastActive": "3 hours ago",
    "verified": true,
    "postedDate": "2025-08-25"
  },
  {
    "id": 2,
    "name": "Rohan Verma",
    "age": 24,
    "occupation": "Software Developer",
    "bio": "Quiet developer seeking a peaceful environment for coding. I am clean, respectful, and keep to myself mostly.",
    "avatar": "https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBzb2Z0d2FyZSUyMGRldmVsb3BlcnxlbnwxfHx8fDE3OTM1Mzk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "location": "Andheri, Mumbai",
    "budget": [25000, 40000],
    "moveInDate": "2025-10-15",
    "roomType": "Private Room",
    "lifestyle": {
      "cleanliness": 5,
      "socialLevel": 2,
      "smoking": false,
      "pets": true
    },
    "interests": ["Gaming", "Technology", "Music", "Coffee"],
    "rating": 4.9,
    "responseRate": 88,
    "lastActive": "2 days ago",
    "verified": true,
    "postedDate": "2025-08-22"
  },
  {
    "id": 3,
    "name": "Aisha Khan",
    "age": 29,
    "occupation": "Graphic Designer",
    "bio": "Creative professional who loves art, music, and hosting dinner parties. Looking for a friendly and open-minded flatmate!",
    "avatar": "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBncmFwaGljJTIwZGVzaWduZXJ8ZW58MXx8fHwxNzkzNTY3NjAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "location": "Koregaon Park, Pune",
    "budget": [20000, 35000],
    "moveInDate": "2025-09-20",
    "roomType": "Private Room",
    "lifestyle": {
      "cleanliness": 4,
      "socialLevel": 5,
      "smoking": false,
      "pets": false
    },
    "interests": ["Art", "Music", "Cooking", "Photography"],
    "rating": 4.7,
    "responseRate": 92,
    "lastActive": "6 hours ago",
    "verified": true,
    "postedDate": "2025-08-18"
  },
  {
    "id": 4,
    "name": "Sameer Joshi",
    "age": 27,
    "occupation": "Teacher",
    "bio": "Friendly teacher looking for a shared space in the city. I enjoy cricket, reading, and quiet evenings after work.",
    "avatar": "https://images.unsplash.com/photo-1609423478893-90a6f4a833d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwdGVhY2hlcnxlbnwxfHx8fDE3OTM1Mzk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "location": "Dadar, Mumbai",
    "budget": [15000, 25000],
    "moveInDate": "2025-09-10",
    "roomType": "Shared Room",
    "lifestyle": {
      "cleanliness": 4,
      "socialLevel": 3,
      "smoking": false,
      "pets": false
    },
    "interests": ["Cricket", "Reading", "Movies", "Trekking"],
    "rating": 4.6,
    "responseRate": 85,
    "lastActive": "4 days ago",
    "verified": false,
        "postedDate": "2025-08-28"
  }
];

export function RoommatesListing() {
  const [roommates, setRoommates] = useState(mockRoommates);
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    budgetRange: [15000, 50000],
    roomType: 'all',
    age: 'all'
  });
  const [savedRoommates, setSavedRoommates] = useState([]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleSaved = (roommateId) => {
    setSavedRoommates(prev => 
      prev.includes(roommateId) 
        ? prev.filter(id => id !== roommateId)
        : [...prev, roommateId]
    );
  };

  const filteredRoommates = roommates.filter(roommate => {
    const matchesSearch = roommate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         roommate.occupation.toLowerCase().includes(filters.search.toLowerCase()) ||
                         roommate.bio.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLocation = filters.location === 'all' || roommate.location.includes(filters.location);
    const matchesBudget = roommate.budget[1] >= filters.budgetRange[0] && roommate.budget[0] <= filters.budgetRange[1];
    const matchesRoomType = filters.roomType === 'all' || roommate.roomType.toLowerCase().includes(filters.roomType);
    const matchesAge = filters.age === 'all' || 
                      (filters.age === '18-25' && roommate.age >= 18 && roommate.age <= 25) ||
                      (filters.age === '26-30' && roommate.age >= 26 && roommate.age <= 30) ||
                      (filters.age === '31+' && roommate.age >= 31);

    return matchesSearch && matchesLocation && matchesBudget && matchesRoomType && matchesAge;
  });

  const formatMoveInDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getLastActiveColor = (lastActive) => {
    if (lastActive.includes('hour')) return 'text-green-600';
    if (lastActive.includes('day') && parseInt(lastActive) <= 3) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground">Find Roommates</h1>
          <p className="text-muted-foreground">Connect with potential flatmates in your area</p>
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
                      placeholder="Search by name, occupation, or interests..."
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
                      <SelectItem value="Koregaon Park">Koregaon Park</SelectItem>
                      <SelectItem value="Dadar">Dadar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <Label>Budget Range (₹/month)</Label>
                <div className="px-3">
                  <Slider
                    value={filters.budgetRange}
                    onValueChange={(value) => handleFilterChange('budgetRange', value)}
                    max={50000}
                    min={15000}
                    step={5000}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{filters.budgetRange[0]}</span>
                  <span>₹{filters.budgetRange[1]}</span>
                </div>
              </div>

              {/* Room Type and Age */}
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
                  <Label>Age Range</Label>
                  <Select value={filters.age} onValueChange={(value) => handleFilterChange('age', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Age</SelectItem>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-30">26-30</SelectItem>
                      <SelectItem value="31+">31+</SelectItem>
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
            {filteredRoommates.length} roommate{filteredRoommates.length !== 1 ? 's' : ''} found
          </p>
          <Select defaultValue="activity">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activity">Most Active</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="recent">Recently Posted</SelectItem>
              <SelectItem value="budget">Budget Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Roommates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoommates.map((roommate) => (
            <Card key={roommate.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={roommate.avatar} />
                        <AvatarFallback>{roommate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {roommate.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                          <Star className="h-3 w-3 fill-current" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{roommate.name}</h3>
                      <p className="text-sm text-muted-foreground">{roommate.age} years old</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={savedRoommates.includes(roommate.id) ? 'text-red-500' : 'text-muted-foreground'}
                    onClick={() => toggleSaved(roommate.id)}
                  >
                    <Heart className={`h-4 w-4 ${savedRoommates.includes(roommate.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{roommate.occupation}</p>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="text-xs">{roommate.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{roommate.bio}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">₹{roommate.budget[0]}-₹{roommate.budget[1]}/mo</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Move-in:</span>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="font-medium">{formatMoveInDate(roommate.moveInDate)}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Room type:</span>
                      <Badge variant="outline" className="text-xs">{roommate.roomType}</Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {roommate.interests.slice(0, 3).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {roommate.interests.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{roommate.interests.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{roommate.rating}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{roommate.responseRate}% response</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span className={getLastActiveColor(roommate.lastActive)}>
                        {roommate.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button asChild size="sm" className="flex-1">
                    <Link to={`/roommate/${roommate.id}`}>View Profile</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoommates.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No roommates found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mr-4"
              onClick={() => setFilters({
                search: '',
                location: 'all',
                budgetRange: [15000, 50000],
                roomType: 'all',
                age: 'all'
              })}
            >
              Clear Filters
            </Button>
            <Button asChild>
              <Link to="/post-roommate">Post Your Request</Link>
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-medium text-foreground mb-2">Looking for roommates?</h2>
            <p className="text-muted-foreground mb-4">
              Post your own request to let potential flatmates find you
            </p>
            <Button asChild>
              <Link to="/post-roommate">Post Roommate Request</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}