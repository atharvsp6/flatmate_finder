import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useAuth } from '../App';
import apiService from '../services/api';
import { 
  Calendar as CalendarIcon,
  MapPin,
  Home,
  User,
  DollarSign,
  Plus,
  X,
  Camera,
  Star
} from 'lucide-react';
import { format } from 'date-fns';

export function PostRoommateRequest() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [moveInDate, setMoveInDate] = useState();
  const [newInterest, setNewInterest] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    bio: user?.bio || '',
    location: user?.location || '',
    preferredAreas: [],
    budget: [800, 1200],
    roomType: '',
    moveInDate: '',
    lifestyle: {
      cleanliness: 3,
      socialLevel: 3,
      smoking: false,
      pets: false,
      workSchedule: '',
      sleepSchedule: ''
    },
    interests: [],
    idealRoommate: '',
    dealBreakers: '',
    contactPreference: 'both'
  });

  const londonAreas = [
    'Camden', 'Shoreditch', 'King\'s Cross', 'Clapham', 'Canary Wharf', 
    'Bloomsbury', 'Islington', 'Hackney', 'Greenwich', 'Brixton',
    'Notting Hill', 'Chelsea', 'Kensington', 'Hammersmith', 'Putney'
  ];

  const commonInterests = [
    'Cooking', 'Yoga', 'Reading', 'Travel', 'Photography', 'Music',
    'Movies', 'Sports', 'Gaming', 'Art', 'Dancing', 'Hiking',
    'Wine', 'Coffee', 'Theatre', 'Technology', 'Fashion', 'Fitness'
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addArea = (area) => {
    if (!formData.preferredAreas.includes(area)) {
      setFormData(prev => ({
        ...prev,
        preferredAreas: [...prev.preferredAreas, area]
      }));
    }
  };

  const removeArea = (area) => {
    setFormData(prev => ({
      ...prev,
      preferredAreas: prev.preferredAreas.filter(a => a !== area)
    }));
  };

  const addInterest = (interest) => {
    if (!formData.interests.includes(interest) && formData.interests.length < 10) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      setError('Please accept the terms of service to continue.');
      return;
    }

    if (!formData.title.trim() || !formData.bio.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields (title, bio, and location).');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare the data for the API
      const requestData = {
        title: formData.title,
        bio: formData.bio,
        location: formData.location,
        preferredAreas: formData.preferredAreas,
        budget: {
          min: formData.budget[0],
          max: formData.budget[1]
        },
        roomType: formData.roomType || 'Private Room',
        moveInDate: moveInDate || new Date(),
        lifestyle: formData.lifestyle,
        interests: formData.interests,
        idealRoommate: formData.idealRoommate,
        dealBreakers: formData.dealBreakers,
        contactPreference: formData.contactPreference,
        profileImage: profileImage || ''
      };

      const result = await apiService.createRoommateRequest(requestData);
      
      if (result.success) {
        alert('Roommate request posted successfully!');
        navigate('/roommates');
      } else {
        setError(result.message || 'Failed to post roommate request. Please try again.');
      }
    } catch (error) {
      console.error('Error posting roommate request:', error);
      setError('Failed to post roommate request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground">Post Roommate Request</h1>
          <p className="text-muted-foreground">Let potential flatmates know what you're looking for</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer hover:bg-primary/90">
                      <Camera className="h-3 w-3" />
                    </label>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div>
                    <p className="font-medium">Upload a clear photo of yourself</p>
                    <p className="text-sm text-muted-foreground">This helps potential flatmates recognize you</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Friendly professional seeking clean flatmate in Camden"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">About You</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell potential flatmates about yourself, your lifestyle, and what you're like to live with..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="min-h-24"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Housing Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Housing Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Current/Preferred Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      className="pl-10"
                      placeholder="e.g., Camden, London"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roomType">Room Type</Label>
                  <Select value={formData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Room</SelectItem>
                      <SelectItem value="shared">Shared Room</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preferred Areas</Label>
                <div className="space-y-3">
                  <Select onValueChange={addArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Add preferred areas..." />
                    </SelectTrigger>
                    <SelectContent>
                      {londonAreas.filter(area => !formData.preferredAreas.includes(area)).map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2">
                    {formData.preferredAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="flex items-center gap-1">
                        {area}
                        <button type="button" onClick={() => removeArea(area)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Budget Range (£/month)</Label>
                <div className="px-3">
                  <Slider
                    value={formData.budget}
                    onValueChange={(value) => handleInputChange('budget', value)}
                    max={2000}
                    min={300}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>£{formData.budget[0]}</span>
                  <span>£{formData.budget[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Move-in Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {moveInDate ? format(moveInDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={moveInDate}
                      onSelect={(selectedDate) => {
                        setMoveInDate(selectedDate);
                        if (selectedDate) {
                          handleInputChange('moveInDate', format(selectedDate, 'yyyy-MM-dd'));
                        }
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Lifestyle Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle & Compatibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Cleanliness Level (1-5)</Label>
                  <div className="px-3 mt-2">
                    <Slider
                      value={[formData.lifestyle.cleanliness]}
                      onValueChange={(value) => handleInputChange('lifestyle.cleanliness', value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Relaxed</span>
                    <span>Very Clean</span>
                  </div>
                </div>

                <div>
                  <Label>Social Level (1-5)</Label>
                  <div className="px-3 mt-2">
                    <Slider
                      value={[formData.lifestyle.socialLevel]}
                      onValueChange={(value) => handleInputChange('lifestyle.socialLevel', value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>Quiet</span>
                    <span>Very Social</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="smoking">Smoking Okay</Label>
                  <Switch
                    id="smoking"
                    checked={formData.lifestyle.smoking}
                    onCheckedChange={(checked) => handleInputChange('lifestyle.smoking', checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="pets">Pets Okay</Label>
                  <Switch
                    id="pets"
                    checked={formData.lifestyle.pets}
                    onCheckedChange={(checked) => handleInputChange('lifestyle.pets', checked)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workSchedule">Work Schedule</Label>
                  <Select value={formData.lifestyle.workSchedule} onValueChange={(value) => handleInputChange('lifestyle.workSchedule', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard office hours (9-5)</SelectItem>
                      <SelectItem value="flexible">Flexible hours</SelectItem>
                      <SelectItem value="remote">Work from home</SelectItem>
                      <SelectItem value="shifts">Shift work</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleepSchedule">Sleep Schedule</Label>
                  <Select value={formData.lifestyle.sleepSchedule} onValueChange={(value) => handleInputChange('lifestyle.sleepSchedule', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sleep schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="early">Early bird (bed by 10pm)</SelectItem>
                      <SelectItem value="normal">Normal (bed by 11-12pm)</SelectItem>
                      <SelectItem value="night">Night owl (bed after 12pm)</SelectItem>
                      <SelectItem value="varies">Varies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interests & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Interests & What You're Looking For</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Your Interests</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an interest..."
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newInterest.trim()) addInterest(newInterest.trim());
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => newInterest.trim() && addInterest(newInterest.trim())}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Common interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonInterests.filter(interest => !formData.interests.includes(interest)).map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-auto py-1 px-2 text-xs"
                          onClick={() => addInterest(interest)}
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                        {interest}
                        <button type="button" onClick={() => removeInterest(interest)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="idealRoommate">Ideal Roommate</Label>
                <Textarea
                  id="idealRoommate"
                  placeholder="Describe what you're looking for in a flatmate..."
                  value={formData.idealRoommate}
                  onChange={(e) => handleInputChange('idealRoommate', e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dealBreakers">Deal Breakers (Optional)</Label>
                <Textarea
                  id="dealBreakers"
                  placeholder="Any absolute no-gos? (e.g., smoking indoors, loud music late at night)"
                  value={formData.dealBreakers}
                  onChange={(e) => handleInputChange('dealBreakers', e.target.value)}
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>How would you like potential flatmates to contact you?</Label>
                <Select value={formData.contactPreference} onValueChange={(value) => handleInputChange('contactPreference', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="messages">Messages only</SelectItem>
                    <SelectItem value="calls">Phone calls preferred</SelectItem>
                    <SelectItem value="both">Both messages and calls</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <p className="text-sm text-muted-foreground">
              I agree to the <a href="#" className="text-primary underline">Terms of Service</a> and confirm that all information provided is accurate.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? 'Posting...' : 'Post Roommate Request'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/roommates')} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}