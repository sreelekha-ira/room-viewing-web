import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, DollarSign, MapPin } from "lucide-react";
import { Room } from "../App";

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
}

export function RoomCard({ room, onBook }: RoomCardProps) {
  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'private': 'Private Stay',
      'shared': 'Shared Stay',
      'family': 'Family Stay',
      'studio': 'Studio Stay',
      'longterm': 'Long-term Stay'
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-blue-600">
          {getTypeLabel(room.type)}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3>{room.name}</h3>
          <p className="text-slate-600">{room.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-slate-600">
            <Users className="size-4" />
            <span>Up to {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="size-4" />
            <span>{room.floor === 1 ? 'Ground floor access' : `${room.floor}th Floor (lift available)`}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map(amenity => (
            <Badge key={amenity} variant="outline">
              {amenity}
            </Badge>
          ))}
          {room.amenities.length > 3 && (
            <Badge variant="outline">
              +{room.amenities.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="w-full flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <span className="text-blue-600">₹{room.price}</span>
              <span className="text-slate-500">per day</span>
            </div>
            <p className="text-xs text-slate-500">Lower rates for longer stays</p>
          </div>
        </div>
        <Button onClick={() => onBook(room)} className="w-full">
          View stay details
        </Button>
      </CardFooter>
    </Card>
  );
}