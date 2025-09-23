import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './assets/ImageWithFallback';
import apiService from '../services/api';
import { 
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await apiService.getBookings();
        if (res.success) setBookings(res.data);
      } catch (e) {
        setError(e.message || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterBookings = (status) => (status ? bookings.filter(b => b.status === status) : bookings);
  const upcomingBookings = filterBookings('confirmed').filter(b => new Date(b.viewingDate) >= new Date());
  const pendingBookings = filterBookings('pending');
  const pastBookings = [...filterBookings('completed'), ...filterBookings('cancelled')];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BookingCard = ({ booking }) => (
    <Card key={booking._id} className="mb-4">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <ImageWithFallback
            src={booking.listing?.images?.[0]}
            alt={booking.listing?.title}
            className="w-full md:w-32 h-32 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-foreground mb-1">{booking.listing?.title}</h3>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{booking.listing?.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(booking.status)}
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{formatDate(booking.viewingDate)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{booking.viewingTime}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{booking.user?.name}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">₹{booking.listing?.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
            </div>

            {booking.message && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-start space-x-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">{booking.message}</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/listing/${booking.listing?._id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Listing
                </Link>
              </Button>
              
              {booking.status === 'confirmed' && (
                <>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call Landlord
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Send Message
                  </Button>
                </>
              )}
              
              {booking.status === 'pending' && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    try {
                      const res = await apiService.cancelBooking(booking._id);
                      if (res.success) {
                        setBookings(prev => prev.map(b => (b._id === booking._id ? res.data : b)));
                      }
                    } catch (e) {
                      alert(e.message || 'Failed to cancel');
                    }
                  }}
                >
                  Cancel Request
                </Button>
              )}
              
              {booking.status === 'completed' && (
                <Button variant="outline" size="sm">
                  Leave Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground">My Bookings</h1>
          <p className="text-muted-foreground">Manage your property viewing appointments</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingBookings.length > 0 ? (
              <div>
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No Upcoming Viewings</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any confirmed viewings scheduled yet.
                  </p>
                  <Button asChild>
                    <Link to="/listings">Browse Properties</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            {pendingBookings.length > 0 ? (
              <div>
                {pendingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No Pending Requests</h3>
                  <p className="text-muted-foreground mb-4">
                    All your booking requests have been responded to.
                  </p>
                  <Button asChild>
                    <Link to="/listings">Book Another Viewing</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastBookings.length > 0 ? (
              <div>
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-2">No Past Bookings</h3>
                  <p className="text-muted-foreground mb-4">
                    Your viewing history will appear here.
                  </p>
                  <Button asChild>
                    <Link to="/listings">Start Exploring</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/listings">
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto mb-2" />
                    <div>Browse Properties</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/roommates">
                  <div className="text-center">
                    <MessageSquare className="h-6 w-6 mx-auto mb-2" />
                    <div>Find Roommates</div>
                  </div>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4">
                <Link to="/post-roommate">
                  <div className="text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2" />
                    <div>Post Request</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}