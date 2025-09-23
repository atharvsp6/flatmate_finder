import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { useAuth } from '../App';
import apiService from '../services/api';
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
  const [roommate, setRoommate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiService.getRoommateRequest(id)
      .then(res => {
        if (res.success && res.data) {
          setRoommate(res.data);
        } else {
          setError('Roommate not found');
        }
      })
      .catch(() => setError('Roommate not found'))
      .finally(() => setLoading(false));
  }, [id]);

  // Build a view model from API shape (RoommateRequest)
  const vm = useMemo(() => {
    if (!roommate) return null;
    const dealBreakersArray = Array.isArray(roommate.dealBreakers)
      ? roommate.dealBreakers
      : (roommate.dealBreakers ? String(roommate.dealBreakers).split(',').map(s => s.trim()).filter(Boolean) : []);
    return {
      name: roommate.user?.name || 'Roommate',
      location: roommate.location || '',
      avatar: roommate.profileImage || roommate.user?.avatar || '',
      bio: roommate.bio || '',
      budgetMin: roommate.budget?.min ?? null,
      budgetMax: roommate.budget?.max ?? null,
      moveInDate: roommate.moveInDate || null,
      roomType: roommate.roomType || '',
      preferredAreas: roommate.preferredAreas || [],
      interests: roommate.interests || [],
      lifestyle: roommate.lifestyle || { cleanliness: 3, socialLevel: 3, smoking: false, pets: false, workSchedule: 'flexible', sleepSchedule: 'flexible' },
      idealRoommate: roommate.idealRoommate || '',
      dealBreakers: dealBreakersArray,
      memberSince: roommate.createdAt || null
    };
  }, [roommate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error || !vm) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || 'Roommate not found'}</div>;

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
                  <div className="relative h-32 w-32 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={vm.avatar || '/default-avatar.svg'}
                      alt={vm.name}
                      className="h-full w-full object-cover"
                    />
                    {roommate?.verified && (
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                        <Shield className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-medium text-foreground">{vm.name}</h1>
                        {(roommate?.age || roommate?.occupation) && (
                          <p className="text-lg text-muted-foreground">
                            {roommate?.age ? `${roommate.age} years old` : ''}
                            {roommate?.age && roommate?.occupation ? ' • ' : ''}
                            {roommate?.occupation ?? ''}
                          </p>
                        )}
                        <div className="flex items-center text-muted-foreground mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{vm.location}</span>
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
                          <span className="font-medium">{roommate?.rating ?? '—'}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{roommate?.responseRate != null ? `${roommate.responseRate}%` : '—'}</p>
                        <p className="text-xs text-muted-foreground">Response Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          <Clock className="h-4 w-4 mr-1 text-green-500" />
                          <span className="font-medium text-green-600">{roommate?.lastActive ? new Date(roommate.lastActive).toLocaleString() : '—'}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Last Active</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{vm.memberSince ? formatMemberSince(vm.memberSince) : '—'}</p>
                        <p className="text-xs text-muted-foreground">Member Since</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground">{vm.bio}</p>
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
                          ₹{vm.budgetMin ?? '—'} - ₹{vm.budgetMax ?? '—'}
                          <span className="text-base text-muted-foreground">/month</span>
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Move-in Date</p>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{vm.moveInDate ? formatMoveInDate(vm.moveInDate) : '—'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Room Type</p>
                      <Badge variant="outline">{vm.roomType}</Badge>
                    </div>

                    <div>
                      <p className="font-medium mb-2">Preferred Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {vm.preferredAreas.map((area) => (
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
                        {vm.interests.map((interest) => (
                          <Badge key={interest} variant="secondary">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Languages</p>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">—</p>
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
                      <p className="text-muted-foreground">{roommate?.idealRoommate || '—'}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Deal Breakers</p>
                      <ul className="space-y-1">
                        {vm.dealBreakers.map((item, index) => (
                          <li key={index} className="text-muted-foreground flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                        {vm.dealBreakers.length === 0 && (
                          <li className="text-muted-foreground">—</li>
                        )}
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
                        <span className="text-sm text-muted-foreground">{vm.lifestyle.cleanliness}/5</span>
                      </div>
                      <Progress value={vm.lifestyle.cleanliness * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {vm.lifestyle.cleanliness >= 4 ? 'Very clean and organized' : 
                         vm.lifestyle.cleanliness >= 3 ? 'Generally tidy' : 'Relaxed about cleanliness'}
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Social Level</p>
                        <span className="text-sm text-muted-foreground">{vm.lifestyle.socialLevel}/5</span>
                      </div>
                      <Progress value={vm.lifestyle.socialLevel * 20} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {vm.lifestyle.socialLevel >= 4 ? 'Very social and outgoing' : 
                         vm.lifestyle.socialLevel >= 3 ? 'Moderately social' : 'Prefers quiet environment'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <Cigarette className="h-4 w-4 mr-2" />
                          <span>Smoking</span>
                        </div>
                        <span className={vm.lifestyle.smoking ? 'text-yellow-600' : 'text-green-600'}>
                          {vm.lifestyle.smoking ? 'Yes' : 'No'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <PawPrint className="h-4 w-4 mr-2" />
                          <span>Pets</span>
                        </div>
                        <span className={vm.lifestyle.pets ? 'text-blue-600' : 'text-muted-foreground'}>
                          {vm.lifestyle.pets ? 'Has pets' : 'No pets'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="font-medium mb-1">Work Schedule</p>
                        <p className="text-muted-foreground">{vm.lifestyle.workSchedule}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Sleep Schedule</p>
                        <p className="text-muted-foreground">{vm.lifestyle.sleepSchedule}</p>
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
                    {roommate?.verifications?.email ? (
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
                    {roommate?.verifications?.phone ? (
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
                    {roommate?.verifications?.id ? (
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
                    {roommate?.verifications?.workEmail ? (
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
                    <span className="font-medium">{roommate?.responseRate != null ? `${roommate.responseRate}%` : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Rating</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">{roommate?.rating ?? '—'}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Posted</span>
                    <span className="font-medium">
                      {roommate?.postedDate ? new Date(roommate.postedDate).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : '—'}
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