import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { useAuth } from '../App';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Wifi, 
  Heart,
  Star,
  Users,
  Calendar,
  Phone,
  Mail,
  Shield,
  ArrowLeft,
  Share2,
  Camera
} from 'lucide-react';

export function ListingDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock listing data - in real app, would fetch based on ID
  const listing = {
    id: parseInt(id || '1'),
    title: "Modern 2-Bed Apartment in Bandra West",
    location: "Bandra West, Mumbai, Maharashtra",
    fullAddress: "123 Linking Road, Bandra West, Mumbai, Maharashtra 400050",
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    roommates: 1,
    maxRoommates: 2,
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwbXVtYmFpfGVufDF8fHx8MTc5MzU2NzM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1633104069776-ea7e61258ec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc1NjU2NzM4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1657084031100-6925483d8a7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGFyZWQlMjBhcGFydG1lbnQlMjBraXRjaGVufGVufDF8fHx8MTc1NjU2NzM4NHww&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    amenities: [
      { name: 'WiFi', icon: 'wifi' },
      { name: 'Parking', icon: 'parking' },
      { name: 'Garden', icon: 'garden' },
      { name: 'Furnished', icon: 'furnished' },
      { name: 'Washing Machine', icon: 'washing' },
      { name: 'Dishwasher', icon: 'dishwasher' }
    ],
    rating: 4.8,
    reviews: 15,
    availableFrom: "September 15, 2025",
    roomType: "Private Room",
    description: "Beautiful modern apartment in the heart of Bandra West with excellent connectivity to the Western Express Highway. The property features modern furnishings, high-speed internet, and a lovely balcony. Perfect for young professionals and students studying in Mumbai.",
    landlord: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3OTM1Njc2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      verified: true,
      responseTime: "Within 1 hour",
      totalListings: 5
    },
    currentRoommates: [
      {
        name: "Rahul Verma",
        age: 28,
        occupation: "Software Developer",
        bio: "Quiet professional who loves coding and exploring Mumbai's food scene",
        avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBzb2Z0d2FyZSUyMGRldmVsb3BlcnxlbnwxfHx8fDE3OTM1Mzk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ],
    houseRules: [
      "No smoking inside",
      "Guests welcome with prior notice",
      "Keep common areas clean",
      "Quiet hours: 11 PM - 7 AM",
      "Respect cultural sensitivities"
    ],
    nearbyTransport: [
      "Bandra Station - 10 min walk",
      "Western Express Highway - 5 min drive",
      "Multiple BEST bus routes",
      "Auto-rickshaw and cab services available"
    ]
  };

  const reviews = [
    {
      id: 1,
      user: "Anjali Patel",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent location in Bandra West! The apartment is exactly as described and Priya is very responsive. Perfect for working professionals."
    },
    {
      id: 2,
      user: "Vikram Singh",
      rating: 4,
      date: "1 month ago",
      comment: "Great amenities and well-maintained property. The Western Express Highway access makes commuting very convenient."
    },
    {
      id: 3,
      user: "Kavita Rao",
      rating: 5,
      date: "3 weeks ago",
      comment: "Loved the modern furnishings and the balcony view. Rahul is a great roommate - very respectful and clean."
    }
  ];

  const getAmenityIcon = (iconType) => {
    switch (iconType) {
      case 'wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/listings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6">
              <ImageWithFallback
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="secondary" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 flex space-x-1">
                {listing.images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 right-4">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  <Camera className="h-3 w-3 mr-1" />
                  {listing.images.length} photos
                </Badge>
              </div>
            </div>

            {/* Property Info */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-medium text-foreground mb-2">{listing.title}</h1>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{listing.bedrooms} bedrooms</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{listing.bathrooms} bathroom</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{listing.roommates}/{listing.maxRoommates} roommates</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{listing.rating}</span>
                    <span className="text-muted-foreground ml-1">({listing.reviews} reviews)</span>
                  </div>
                  <Badge variant="outline" className="mt-2">{listing.roomType}</Badge>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="roommates">Roommates</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About this place</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{listing.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>House Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {listing.houseRules.map((rule, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <Shield className="h-4 w-4 mr-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Transport Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {listing.nearbyTransport.map((transport, index) => (
                        <li key={index} className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {transport}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle>What this place offers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {listing.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          {getAmenityIcon(amenity.icon)}
                          <span className="text-foreground">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="roommates">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Roommates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {listing.currentRoommates.map((roommate, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <Avatar>
                            <AvatarImage src={roommate.avatar} />
                            <AvatarFallback>{roommate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{roommate.name}</h4>
                            <p className="text-sm text-muted-foreground">{roommate.age} years old • {roommate.occupation}</p>
                            <p className="text-sm text-muted-foreground mt-1">{roommate.bio}</p>
                          </div>
                        </div>
                      ))}
                      {listing.roommates < listing.maxRoommates && (
                        <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
                          <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            {listing.maxRoommates - listing.roommates} space{listing.maxRoommates - listing.roommates > 1 ? 's' : ''} available
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews ({listing.reviews})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{review.user}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <span className="text-3xl font-medium text-foreground">₹{listing.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <div className="flex items-center justify-center text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Available from {listing.availableFrom}</span>
                </div>
                <div className="space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Button asChild className="w-full">
                        <Link to={`/booking/${listing.id}`}>Book Viewing</Link>
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact Landlord
                      </Button>
                    </>
                  ) : (
                    <Button asChild className="w-full">
                      <Link to="/auth">Login to Book</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Landlord Info */}
            <Card>
              <CardHeader>
                <CardTitle>Hosted by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={listing.landlord.avatar} />
                    <AvatarFallback>{listing.landlord.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{listing.landlord.name}</h4>
                      {listing.landlord.verified && (
                        <Badge variant="default" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{listing.landlord.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Response time: {listing.landlord.responseTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {listing.landlord.totalListings} listings
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Host
                </Button>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle>Safety Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm">Verified listing</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm">Secure payments</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="text-sm">24/7 support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}