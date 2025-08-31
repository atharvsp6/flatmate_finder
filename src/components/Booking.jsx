import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { useAuth } from '../App';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

export function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState();
  const [bookingData, setBookingData] = useState({
    viewingDate: '',
    viewingTime: '',
    message: '',
    phoneNumber: user?.phone || '',
    moveInDate: ''
  });

  // Mock listing data
  const listing = {
    id: parseInt(id || '1'),
    title: "Modern 2-Bed Apartment in Central London",
    location: "Camden, London",
    price: 950,
    image: "https://images.unsplash.com/photo-1559329146-807aff9ff1fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTY1NjczNzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    landlord: {
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY1Mzk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    alert('Booking request submitted successfully!');
    navigate('/my-bookings');
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-medium text-foreground">Book a Viewing</h1>
            <p className="text-muted-foreground">Schedule a visit to see this property</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Viewing Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Preferred Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              setDate(selectedDate);
                              if (selectedDate) {
                                handleInputChange('viewingDate', format(selectedDate, 'yyyy-MM-dd'));
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Time</Label>
                      <Select value={bookingData.viewingTime} onValueChange={(value) => handleInputChange('viewingTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            className="pl-10"
                            value={user?.name || ''}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            className="pl-10"
                            value={bookingData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={user?.email || ''}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  {/* Move-in Date */}
                  <div className="space-y-2">
                    <Label htmlFor="moveInDate">Desired Move-in Date</Label>
                    <Input
                      id="moveInDate"
                      type="date"
                      value={bookingData.moveInDate}
                      onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message to Landlord (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="message"
                        placeholder="Tell the landlord about yourself and why you're interested in this property..."
                        className="pl-10 min-h-24"
                        value={bookingData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" required className="mt-1" />
                    <p className="text-sm text-muted-foreground">
                      I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and <a href="#" className="text-primary underline">Privacy Policy</a>. 
                      I understand that this is a viewing request and not a confirmed booking.
                    </p>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Viewing Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Property Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-medium text-foreground mb-2">{listing.title}</h3>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                <div className="text-center mb-4">
                  <span className="text-2xl font-medium text-foreground">£{listing.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary-foreground font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Request Submitted</p>
                      <p className="text-sm text-muted-foreground">Your viewing request will be sent to the landlord</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-muted-foreground font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Landlord Response</p>
                      <p className="text-sm text-muted-foreground">They'll confirm or suggest alternative times</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-muted-foreground font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Viewing Confirmed</p>
                      <p className="text-sm text-muted-foreground">You'll receive confirmation details</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={listing.landlord.avatar}
                    alt={listing.landlord.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{listing.landlord.name}</p>
                    <p className="text-sm text-muted-foreground">Property Host</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Directly
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}