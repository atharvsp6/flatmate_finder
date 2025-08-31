import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './assets/ImageWithFallback';
import { Search, Users, Home, Shield, Star, MapPin } from 'lucide-react';

export function Landing() {
  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find the perfect place with our advanced filtering system',
    },
    {
      icon: Users,
      title: 'Verified Roommates',
      description: 'Connect with verified and trustworthy flatmates',
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Safe and secure booking process with protection',
    },
    {
      icon: Star,
      title: 'Quality Listings',
      description: 'High-quality verified property listings',
    },
  ];

  const testimonials = [
    {
      name: 'Disha Patil',
      location: 'Nagpur',
      rating: 5,
      comment: 'Found my perfect flatmate within a week! The platform is so easy to use.',
    },
    {
      name: 'Amit Sharma',
      location: 'Pune',
      rating: 5,
      comment: 'Great experience finding accommodation. Highly recommended!',
    },
    {
      name: 'Esha Gupta',
      location: 'Kolhapur',
      rating: 5,
      comment: 'The verification process made me feel safe about choosing roommates.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-6">
                Find Your Perfect
                <span className="text-primary block">Flatmate</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                Discover amazing properties and connect with like-minded flatmates in your area. 
                Safe, secure, and simple.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link to="/listings">Browse Listings</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/roommates">Find Roommates</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  <span>1000+ Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>5000+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>50+ Cities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="src/components/assets/flat image hero.png"
                alt="Modern apartment living room"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Why Choose StayShare?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make finding the perfect flatmate and accommodation simple, safe, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Thousands of happy flatmates have found their perfect match
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-foreground mb-4">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-medium text-primary-foreground mb-4">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of happy flatmates who found their ideal living situation through StayShare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/auth">Get Started Today</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" >
              <Link to="/listings">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}