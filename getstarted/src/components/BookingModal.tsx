import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Room } from "../App";
import { CalendarIcon, Users, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (startDate: Date, endDate: Date, guests: number) => void;
}

export function BookingModal({ room, isOpen, onClose, onConfirm }: BookingModalProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [guests, setGuests] = useState<string>("1");

  if (!room) return null;

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return room.price * Math.max(1, days);
  };

  const getDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) return;
    onConfirm(startDate, endDate, parseInt(guests));
    setStartDate(undefined);
    setEndDate(undefined);
    setGuests("1");
  };

  const handleClose = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setGuests("1");
    onClose();
  };

  const isValidBooking = startDate && endDate && endDate > startDate && parseInt(guests) <= room.capacity;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Stay Information — {room.name}</DialogTitle>
          <DialogDescription>
            View availability and stay details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Room Summary */}
          <div className="p-4 bg-slate-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Stay Type</span>
              <Badge>{room.type.charAt(0).toUpperCase() + room.type.slice(1)}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Capacity</span>
              <span>Up to {room.capacity} {room.capacity === 1 ? 'guest' : 'guests'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Price per day</span>
              <span className="text-blue-600">₹{room.price}</span>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 size-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="mr-2 size-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => !startDate || date <= startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Number of Guests */}
          <div className="space-y-2">
            <Label>Number of Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: room.capacity }, (_, i) => i + 1).map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label>Included Amenities</Label>
            <div className="flex flex-wrap gap-2">
              {room.amenities.map(amenity => (
                <Badge key={amenity} variant="outline">
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          {/* Booking Summary */}
          {startDate && endDate && (
            <div className="p-4 bg-blue-50 rounded-lg space-y-2 border border-blue-200">
              <h4 className="text-blue-900">Stay Summary</h4>
              <div className="flex items-center justify-between text-blue-800">
                <div className="flex items-center gap-2">
                  <Clock className="size-4" />
                  <span>Duration</span>
                </div>
                <span>{getDays()} {getDays() === 1 ? "day" : "days"}</span>
              </div>
              <div className="flex items-center justify-between text-blue-800">
                <div className="flex items-center gap-2">
                  <Users className="size-4" />
                  <span>Guests</span>
                </div>
                <span>{guests} {parseInt(guests) === 1 ? "person" : "people"}</span>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-5 text-blue-600" />
                    <span>Total Price</span>
                  </div>
                  <span className="text-blue-600">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleConfirm} disabled={!isValidBooking}>
            Check availability & info
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}