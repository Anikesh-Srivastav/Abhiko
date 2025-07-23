import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Restaurant } from '@/lib/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={`${restaurant.image}?text=${restaurant.name.replace(/\s/g,'+')}`}
            alt={restaurant.name}
            data-ai-hint="restaurant food"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{restaurant.cuisine}</Badge>
        <CardTitle className="font-headline text-xl mb-1">{restaurant.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span>{restaurant.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full font-bold">
          <Link href={`/delivery/${restaurant.id}`}>
            <Utensils className="mr-2 h-4 w-4" />
            View Menu
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
