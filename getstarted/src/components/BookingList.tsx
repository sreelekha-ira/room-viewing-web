import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Booking, Room } from "../App";
import { Calendar, Users, DollarSign, MapPin, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface BookingListProps {
  bookings: Booking[];
  rooms: Room[];
  onCancelBooking: (bookingId: string) => void;
}

export function BookingList({ bookings, rooms, onCancelBooking }: BookingListProps) {
  const getRoomDetails = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const isUpcoming = (startDate: Date) => {
    return startDate >= new Date();
  };

  const upcomingBookings = bookings.filter(b => isUpcoming(b.startDate));
  const pastBookings = bookings.filter(b => !isUpcoming(b.startDate));

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="size-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-slate-500 mb-2">No saved stays yet</h3>
        <p className="text-slate-400">Start by browsing available stays</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="space-y-4">
          <h2>Upcoming Stays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBookings.map(booking => {
              const room = getRoomDetails(booking.roomId);
              if (!room) return null;

              return (
                <Card key={booking.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle>{booking.roomName}</CardTitle>
                      <Badge className="bg-green-600">Upcoming</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="size-4" />
                      <span>
                        {format(booking.startDate, "MMM dd")} - {format(booking.endDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="size-4" />
                      <span>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="size-4" />
                      <span>Floor {room.floor}</span>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="size-5 text-blue-600" />
                          <span className="text-blue-600">{booking.totalPrice}</span>
                        </div>
                        <span className="text-slate-500">Total</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {room.amenities.slice(0, 3).map(amenity => (
                        <Badge key={amenity} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => onCancelBooking(booking.id)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      Cancel Booking
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Past Bookings */}
      {pastBookings.length > 0 && (
        <div className="space-y-4">
          <h2>Past Stays</h2>
          <Alert>
            <AlertCircle className="size-4" />
            <AlertDescription>
              These stays have already occurred
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastBookings.map(booking => {
              const room = getRoomDetails(booking.roomId);
              if (!room) return null;

              return (
                <Card key={booking.id} className="overflow-hidden opacity-75">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle>{booking.roomName}</CardTitle>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="size-4" />
                      <span>
                        {format(booking.startDate, "MMM dd")} - {format(booking.endDate, "MMM dd, yyyy")}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users className="size-4" />
                      <span>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</span>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="size-5 text-slate-600" />
                          <span className="text-slate-600">{booking.totalPrice}</span>
                        </div>
                        <span className="text-slate-500">Total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}