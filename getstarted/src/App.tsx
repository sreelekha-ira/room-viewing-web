import { useState } from "react";
import { RoomCard } from "./components/RoomCard";
import { RoomFilters } from "./components/RoomFilters";
import { BookingModal } from "./components/BookingModal";
import { BookingList } from "./components/BookingList";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Calendar, Hotel } from "lucide-react";

export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  price: number;
  image: string;
  amenities: string[];
  description: string;
  floor: number;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  guests: number;
}

export interface Filters {
  type: string;
  minCapacity: number;
  maxPrice: number;
  amenities: string[];
}

const ROOMS: Room[] = [
  {
    id: "1",
    name: "Private Stay — Executive Room",
    type: "private",
    capacity: 2,
    price: 299,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyNTQyNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Attached Bathroom", "Air Conditioning", "Balcony", "Hot Water"],
    description: "Comfortable private room suitable for short or extended stays",
    floor: 5
  },
  {
    id: "2",
    name: "Shared Stay — Modern Room",
    type: "shared",
    capacity: 4,
    price: 99,
    image: "https://images.unsplash.com/photo-1703355685952-03ed19f70f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25mZXJlbmNlJTIwcm9vbXxlbnwxfHx8fDE3NjI1MzI5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Shared Bathroom", "Natural Light", "Storage", "Fan"],
    description: "Affordable shared accommodation with essential amenities",
    floor: 3
  },
  {
    id: "3",
    name: "Family Stay — Spacious Suite",
    type: "family",
    capacity: 6,
    price: 399,
    image: "https://images.unsplash.com/photo-1560821630-1a7c45c3286e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjI1MzM4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Kitchen Access", "Washing Machine", "Balcony", "Hot Water"],
    description: "Spacious family accommodation with kitchen and multiple beds",
    floor: 2
  },
  {
    id: "4",
    name: "Studio Stay — Compact Living",
    type: "studio",
    capacity: 2,
    price: 199,
    image: "https://images.unsplash.com/photo-1663186867803-bd547d4bd5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBzdWl0ZSUyMHJvb218ZW58MXx8fHwxNzYyNTg5OTExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Attached Bathroom", "Workspace", "Air Conditioning", "Kitchen Access"],
    description: "Modern studio with workspace, perfect for working professionals",
    floor: 4
  },
  {
    id: "5",
    name: "Long-term Stay — Furnished Flat",
    type: "longterm",
    capacity: 3,
    price: 179,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyNTQyNTE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Kitchen Access", "Washing Machine", "Housekeeping", "Power Backup"],
    description: "Fully furnished flat ideal for extended stays with all amenities",
    floor: 1
  },
  {
    id: "6",
    name: "Private Stay — Deluxe Room",
    type: "private",
    capacity: 2,
    price: 249,
    image: "https://images.unsplash.com/photo-1560821630-1a7c45c3286e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBvZmZpY2UlMjBzcGFjZXxlbnwxfHx8fDE3NjI1MzM4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    amenities: ["WiFi", "Attached Bathroom", "Natural Light", "Balcony", "Home Food Available"],
    description: "Comfortable deluxe room with home food service available",
    floor: 6
  }
];

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    minCapacity: 0,
    maxPrice: 500,
    amenities: []
  });
  
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const filteredRooms = ROOMS.filter(room => {
    if (filters.type !== "all" && room.type !== filters.type) return false;
    if (room.capacity < filters.minCapacity) return false;
    if (room.price > filters.maxPrice) return false;
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        room.amenities.includes(amenity)
      );
      if (!hasAllAmenities) return false;
    }
    return true;
  });

  const handleBookRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (startDate: Date, endDate: Date, guests: number) => {
    if (!selectedRoom) return;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = selectedRoom.price * days;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      startDate,
      endDate,
      totalPrice,
      guests
    };

    setBookings([...bookings, newBooking]);
    setIsBookingModalOpen(false);
    setSelectedRoom(null);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(bookings.filter(b => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hotel className="size-8 text-blue-600" />
              <div>
                <h1>StayBook</h1>
                <p className="text-slate-500">Find real places to stay — day, week, or month</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Browsing stays (no account needed)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="browse">Browse Stays</TabsTrigger>
            <TabsTrigger value="bookings">Saved Stays</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <RoomFilters 
                  filters={filters} 
                  onFiltersChange={setFilters}
                />
              </div>

              {/* Rooms Grid */}
              <div className="lg:col-span-3">
                <div className="mb-4">
                  <p className="text-slate-600">
                    Showing {filteredRooms.length} of {ROOMS.length} stays
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredRooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onBook={handleBookRoom}
                    />
                  ))}
                </div>

                {filteredRooms.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-500">No stays match your filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setFilters({
                        type: "all",
                        minCapacity: 0,
                        maxPrice: 500,
                        amenities: []
                      })}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <BookingList 
              bookings={bookings}
              rooms={ROOMS}
              onCancelBooking={handleCancelBooking}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Modal */}
      <BookingModal
        room={selectedRoom}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(null);
        }}
        onConfirm={handleConfirmBooking}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-slate-600">
            <span>✓ No login required</span>
            <span className="hidden md:inline">•</span>
            <span>✓ Anonymous reviews</span>
            <span className="hidden md:inline">•</span>
            <span>✓ We share verified stay information</span>
            <span className="hidden md:inline">•</span>
            <span>✓ Payments handled directly with hosts</span>
          </div>
          <p className="text-center text-slate-500 text-sm mt-4">
            A free platform to discover real places to stay with clear, honest information.
          </p>
        </div>
      </footer>
    </div>
  );
}