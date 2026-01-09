import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Filters } from "../App";
import { Filter } from "lucide-react";

interface RoomFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const AMENITIES = [
  "WiFi",
  "Attached Bathroom",
  "Shared Bathroom",
  "Hot Water",
  "Balcony",
  "Natural Light",
  "Air Conditioning",
  "Fan",
  "Storage",
  "Kitchen Access",
  "Home Food Available",
  "Nearby Restaurants",
  "Workspace",
  "Desk & Chair",
  "Washing Machine",
  "Housekeeping",
  "Drinking Water",
  "Power Backup"
];

export function RoomFilters({ filters, onFiltersChange }: RoomFiltersProps) {
  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: value });
  };

  const handleCapacityChange = (value: number[]) => {
    onFiltersChange({ ...filters, minCapacity: value[0] });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, maxPrice: value[0] });
  };

  const handleAmenityToggle = (amenity: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenity]
      : filters.amenities.filter(a => a !== amenity);
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  const handleReset = () => {
    onFiltersChange({
      type: "all",
      minCapacity: 0,
      maxPrice: 500,
      amenities: []
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="size-5" />
          Refine your stay
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Room Type */}
        <div className="space-y-2">
          <Label>Stay Type</Label>
          <Select value={filters.type} onValueChange={handleTypeChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stay Types</SelectItem>
              <SelectItem value="private">Private Stay</SelectItem>
              <SelectItem value="shared">Shared Stay</SelectItem>
              <SelectItem value="family">Family Stay</SelectItem>
              <SelectItem value="studio">Studio Stay</SelectItem>
              <SelectItem value="longterm">Long-term Stay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Capacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Number of guests</Label>
            <span className="text-slate-600">{filters.minCapacity} {filters.minCapacity === 1 ? 'guest' : 'guests'}</span>
          </div>
          <Slider
            value={[filters.minCapacity]}
            onValueChange={handleCapacityChange}
            max={10}
            step={1}
          />
        </div>

        {/* Maximum Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Max price per day</Label>
            <span className="text-slate-600">₹{filters.maxPrice}/day</span>
          </div>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={handlePriceChange}
            max={500}
            step={10}
          />
          <p className="text-xs text-slate-500">Weekly and monthly discounts may apply</p>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {AMENITIES.map(amenity => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => 
                    handleAmenityToggle(amenity, checked as boolean)
                  }
                />
                <label
                  htmlFor={amenity}
                  className="flex-1 cursor-pointer"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleReset}
        >
          Clear all filters
        </Button>
      </CardContent>
    </Card>
  );
}