import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { useAuth } from '../App';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { Camera, MapPin, Phone, Mail, Calendar, Home } from 'lucide-react';

export function UserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    age: 25,
    occupation: 'Software Developer',
    location: 'London',
    profileImage: null
  });

  const [preferences, setPreferences] = useState({
    budget: [500, 1200],
    location: 'London',
    roomType: 'private',
    smoking: false,
    pets: false,
    cleanliness: 4,
    socialLevel: 3,
    workSchedule: 'standard'
  });

  const [interests, setInterests] = useState([
    'Reading', 'Cooking', 'Music', 'Sports', 'Movies'
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({ ...profile, profileImage: e.target?.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    alert('Profile saved successfully!');
  };

  const handleSavePreferences = () => {
    // In a real app, this would make an API call
    alert('Preferences saved successfully!');
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <ImageWithFallback
                      src={profile.profileImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NTY1Mzk3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
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
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">Upload a clear photo of yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        className="pl-10"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={profile.occupation}
                      onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        className="pl-10"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell potential flatmates about yourself..."
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="min-h-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add interests to help match with compatible flatmates
                  </p>
                </div>

                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Flatmate Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Budget Range (£/month)</Label>
                  <div className="px-3">
                    <Slider
                      value={preferences.budget}
                      onValueChange={(value) => setPreferences({ ...preferences, budget: value })}
                      max={2000}
                      min={200}
                      step={50}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>£{preferences.budget[0]}</span>
                    <span>£{preferences.budget[1]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Preferred Location</Label>
                    <Select value={preferences.location} onValueChange={(value) => setPreferences({ ...preferences, location: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="London">London</SelectItem>
                        <SelectItem value="Manchester">Manchester</SelectItem>
                        <SelectItem value="Birmingham">Birmingham</SelectItem>
                        <SelectItem value="Leeds">Leeds</SelectItem>
                        <SelectItem value="Liverpool">Liverpool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Room Type</Label>
                    <Select value={preferences.roomType} onValueChange={(value) => setPreferences({ ...preferences, roomType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private Room</SelectItem>
                        <SelectItem value="shared">Shared Room</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smoking">Smoking Allowed</Label>
                    <Switch
                      id="smoking"
                      checked={preferences.smoking}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, smoking: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pets">Pets Allowed</Label>
                    <Switch
                      id="pets"
                      checked={preferences.pets}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, pets: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cleanliness Level (1-5)</Label>
                  <div className="px-3">
                    <Slider
                      value={[preferences.cleanliness]}
                      onValueChange={(value) => setPreferences({ ...preferences, cleanliness: value[0] })}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Relaxed</span>
                    <span>Very Clean</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Social Level (1-5)</Label>
                  <div className="px-3">
                    <Slider
                      value={[preferences.socialLevel]}
                      onValueChange={(value) => setPreferences({ ...preferences, socialLevel: value[0] })}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Quiet</span>
                    <span>Very Social</span>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="w-full md:w-auto">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Account Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Email Verified</h4>
                        <p className="text-sm text-muted-foreground">Your email has been verified</p>
                      </div>
                    </div>
                    <Badge variant="default">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-medium">Phone Verified</h4>
                        <p className="text-sm text-muted-foreground">Your phone number has been verified</p>
                      </div>
                    </div>
                    <Badge variant="default">Verified</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">ID Verification</h4>
                        <p className="text-sm text-muted-foreground">Upload government ID for verification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Upload ID
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Home className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Background Check</h4>
                        <p className="text-sm text-muted-foreground">Complete background verification</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Start Check
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}