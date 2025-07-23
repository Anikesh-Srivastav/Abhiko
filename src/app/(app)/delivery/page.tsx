'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RestaurantCard } from '@/components/restaurant-card';
import { RESTAURANTS } from '@/lib/data';
import type { Restaurant } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // In a real app, this would be an API call.
  // Here, we simulate a delay to show loading states.
  await new Promise(resolve => setTimeout(resolve, 500));
  return RESTAURANTS;
};

export default function DeliveryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });

  const filteredRestaurants = restaurants?.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = cuisineFilter === 'all' || r.cuisine === cuisineFilter;
    return matchesSearch && matchesCuisine;
  });

  const uniqueCuisines = [...new Set(restaurants?.map(r => r.cuisine) || [])];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Find Your Next Meal</h1>
        <p className="text-muted-foreground mt-2">
          Explore the finest Indian restaurants and get your favorite dishes delivered to your doorstep.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search for a restaurant..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cuisines</SelectItem>
            {uniqueCuisines.map(cuisine => (
              <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants?.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
       {filteredRestaurants?.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline">No Restaurants Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
