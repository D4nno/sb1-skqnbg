import * as React from "react";
import { TimePicker } from "@nativescript/core";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { LocationInput } from "./LocationInput";
import { StopList } from "./StopList";
import { Stop } from "../../types/trip";
import { showError } from "../../utils/alerts";

interface TripFormProps {
  onSubmit: (stops: Stop[]) => void;
}

export function TripForm({ onSubmit }: TripFormProps) {
  const [startLocation, setStartLocation] = React.useState("");
  const [departureTime, setDepartureTime] = React.useState(new Date());
  const [stops, setStops] = React.useState<Stop[]>([]);
  const [finalDestination, setFinalDestination] = React.useState("");

  const handleAddStop = () => {
    setStops([...stops, { name: "", location: null, dwellTime: 30 }]);
  };

  const handleUpdateStop = (index: number, stop: Stop) => {
    const newStops = [...stops];
    newStops[index] = stop;
    setStops(newStops);
  };

  const handleRemoveStop = (index: number) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!startLocation) {
      showError("Validation Error", "Please enter a start location");
      return;
    }

    if (!finalDestination) {
      showError("Validation Error", "Please enter a final destination");
      return;
    }

    const allStops = [
      { name: startLocation, location: null, dwellTime: 0 },
      ...stops,
      { name: finalDestination, location: null, dwellTime: 0 }
    ];

    onSubmit(allStops);
  };

  return (
    <stackLayout>
      <LocationInput
        value={startLocation}
        onLocationSelect={setStartLocation}
        hint="Start Location"
        className="mb-4"
      />

      <label className="text-sm text-gray-600 mb-2">Departure Time</label>
      <timePicker
        hour={departureTime.getHours()}
        minute={departureTime.getMinutes()}
        className="mb-4"
        onTimeChange={(args) => {
          const time = args.value as Date;
          setDepartureTime(time);
        }}
      />

      <StopList
        stops={stops}
        onUpdateStop={handleUpdateStop}
        onRemoveStop={handleRemoveStop}
      />

      <Button
        text="Add Stop"
        onTap={handleAddStop}
        variant="link"
        className="mb-4"
      />

      <LocationInput
        value={finalDestination}
        onLocationSelect={setFinalDestination}
        hint="Final Destination"
        className="mb-6"
      />

      <Button
        text="Plan Route"
        onTap={handleSubmit}
        className="mt-4"
      />
    </stackLayout>
  );
}