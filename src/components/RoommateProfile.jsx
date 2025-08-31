import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useAuth } from '../App';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Star,
  MessageSquare,
  Heart,
  Clock,
  Shield,
  CheckCircle,
  Phone,
  Mail,
  User,
  Home,
  Cigarette,
  PawPrint
} from 'lucide-react';

export function RoommateProfile() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  // Mock roommate data - in real app, would fetch based on ID
  const roommate = {
    id: parseInt(id || '1'),
    name: "Anika Joshi",
    age: 26,
    occupation: "Software Engineer",
    bio: "Friendly and easy-going professional looking for a clean, social flatmate. I love exploring local cafes, trekking in the Sahyadris on weekends, and hosting friends for movie nights. I work a hybrid schedule, so I'm home 2-3 days a week. Looking for someone who appreciates a tidy space but is also chill.",
    avatar: "https://images.unsplash.com/photo-1607504622473-62981bf57d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcm9vbW1hdGVzfGVufDF8fHx8MTc1NjU2NzYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    location: "Bandra, Mumbai",
    preferredAreas: ["Andheri", "Juhu", "Powai", "Lower Parel"],
    budget: [25000, 40000], // Budget in INR
    moveInDate: "2025-09-15",
    roomType: "Private Room",
    lifestyle: {
      cleanliness: 4,
      socialLevel: 4,
      smoking: false,
      pets: false,
      workSchedule: "Hybrid schedule (3 days in office)",
      sleepSchedule: "Night owl (asleep by 1am)"
    },
    interests: ["Cooking", "Trekking", "Reading", "Bollywood Movies", "Photography", "Exploring Street Food"],
    languages: ["Marathi (Native)", "Hindi (Fluent)", "English (Fluent)"],
    rating: 4.8,
    responseRate: 95,
    lastActive: "2 hours ago",
    verified: true,
    verifications: {
      email: true,
      phone: true,
      id: true, // Aadhaar/PAN verified
      workEmail: true
    },
    postedDate: "2025-08-20",
    memberSince: "2024-08-15",
    photos: [
      "https://images.unsplash.com/photo-1607504622473-62981bf57d13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcGVvcGxlJTIwcm9vbW1hdGVzfGVufDF8fHx8MTc1NjU2NzYwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    idealRoommate: "Someone who's clean, respectful, and enjoys socializing occasionally. I'd love to share meals or watch a cricket match together but also respect each other's personal space.",
    dealBreakers: ["Heavy smoking", "Excessive messiness", "Not contributing to household chores"]
  };

  const reviews = [
    {
      id: 1,
      reviewer: "Rahul Verma",
      rating: 5,
      date: "2 months ago",
      comment: "Anika was a fantastic flatmate! Very clean, considerate, and great to chat with over chai. Would definitely recommend.",
      duration: "6 months"
    },
    {
      id: 2,
      reviewer: "Sneha Patil",
      rating: 5,
      date: "6 months ago",
      comment: "Lovely person to live with. Always respectful and great at communication. We had a great time sharing festival sweets!",
      duration: "8 months"
    },
    {
      id: 3,
      reviewer: "Amit Deshpande",
      rating: 4,
      date: "1 year ago",
      comment: "Anika is reliable and friendly. Good at keeping common areas clean and always paid bills on time.",
      duration: "4 months"
    }
  ];

  const formatMoveInDate = (dateString) => {
    // Using en-GB locale for DD/MM/YYYY format which is common in India
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatMemberSince = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/roommates">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roommates
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={roommate.avatar} />
                      <AvatarFallback className="text-2xl">
                        {roommate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {roommate.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                        <Shield className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-medium text-foreground">{roommate.name}</h1>
                        <p className="text-lg text-muted-foreground">{roommate.age} years old • {roommate.occupation}</p>
                        <div className="flex items-center text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{roommate.location}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={isSaved ? 'text-red-500' : 'text-muted-foreground'}
                        onClick={() => setIsSaved(!isSaved)}
                      >
                        <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{roommate.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{roommate.responseRate}%</p>
                        <p className="text-xs text-muted-foreground">Response Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-1 text-green-500" />
                          <span className="font-medium text-green-600">{roommate.lastActive}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last Active</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{formatMemberSince(roommate.memberSince)}</p>
                        <p className="text-xs text-muted-foreground">Member Since</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{roommate.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Housing Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-2">Budget Range</p>
                        <p className="text-2xl font-medium text-foreground">
                          ₹{roommate.budget[0]} - ₹{roommate.budget[1]}
                          <span className="text-base text-muted-foreground">/month</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Move-in Date</p>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatMoveInDate(roommate.moveInDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Room Type</p>
                      <Badge variant="outline">{roommate.roomType}</Badge>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Preferred Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {roommate.preferredAreas.map((area) => (
                          <Badge key={area} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Interests & Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {roommate.interests.map((interest) => (
                          <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Languages</p>
                      <div className="space-y-1">
                        {roommate.languages.map((language) => (
                          <p key={language} className="text-muted-foreground">{language}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What I'm Looking For</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Ideal Roommate</p>
                      <p className="text-muted-foreground">{roommate.idealRoommate}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Deal Breakers</p>
                      <ul className="space-y-1">
                        {roommate.dealBreakers.map((item, index) => (
                          <li key={index} className="text-muted-foreground flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lifestyle" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lifestyle Compatibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Cleanliness Level</p>
                        <span className="text-sm text-muted-foreground">{roommate.lifestyle.cleanliness}/5</span>
                      </div>
                      <Progress value={roommate.lifestyle.cleanliness * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {roommate.lifestyle.cleanliness >= 4 ? 'Very clean and organized' : 
                         roommate.lifestyle.cleanliness >= 3 ? 'Generally tidy' : 'Relaxed about cleanliness'}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Social Level</p>
                        <span className="text-sm text-muted-foreground">{roommate.lifestyle.socialLevel}/5</span>
                      </div>
                      <Progress value={roommate.lifestyle.socialLevel * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {roommate.lifestyle.socialLevel >= 4 ? 'Very social and outgoing' : 
                         roommate.lifestyle.socialLevel >= 3 ? 'Moderately social' : 'Prefers quiet environment'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <Cigarette className="h-4 w-4 mr-2" />
                          <span>Smoking</span>
                        </div>
                        <span className={roommate.lifestyle.smoking ? 'text-yellow-600' : 'text-green-600'}>
                          {roommate.lifestyle.smoking ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <PawPrint className="h-4 w-4 mr-2" />
                          <span>Pets</span>
                        </div>
                        <span className={roommate.lifestyle.pets ? 'text-blue-600' : 'text-muted-foreground'}>
                          {roommate.lifestyle.pets ? 'Has pets' : 'No pets'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium mb-1">Work Schedule</p>
                        <p className="text-muted-foreground">{roommate.lifestyle.workSchedule}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Sleep Schedule</p>
                        <p className="text-muted-foreground">{roommate.lifestyle.sleepSchedule}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews from Previous Flatmates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.reviewer}</h4>
                              <p className="text-sm text-muted-foreground">
                                Lived together for {review.duration} • {review.date}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
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
            {/* Contact Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <p className="text-lg font-medium">Interested?</p>
                  <p className="text-sm text-muted-foreground">Send a message to connect</p>
                </div>
                <div className="space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Phone className="h-4 w-4 mr-2" />
                        Request Contact
                      </Button>
                    </>
                  ) : (
                    <Button asChild className="w-full">
                      <Link to="/auth">Login to Contact</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-sm">Email</span>
                    </div>
                    {roommate.verifications.email ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">Phone</span>
                    </div>
                    {roommate.verifications.phone ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-sm">ID Verification</span>
                    </div>
                    {roommate.verifications.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      <span className="text-sm">Work Email</span>
                    </div>
                    {roommate.verifications.workEmail ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Rate</span>
                    <span className="font-medium">{roommate.responseRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{roommate.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Posted</span>
                    <span className="font-medium">
                      {new Date(roommate.postedDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                    </span>
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