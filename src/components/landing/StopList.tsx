import * as React from "react";
import { LocationInput } from "./LocationInput";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Stop } from "../../types/trip";

interface StopListProps {
  stops: Stop[];
  onUpdateStop: (index: number, stop: Stop) => void;
  onRemoveStop: (index: number) => void;
}

export function StopList({ stops, onUpdateStop, onRemoveStop }: StopListProps) {
  return (
    <stackLayout className="mb-4">
      {stops.map((stop, index) => (
        <gridLayout
          key={index}
          columns="*, auto, auto"
          className="mb-4"
        >
          <stackLayout col="0">
            <LocationInput
              value={stop.name}
              onLocationSelect={(name) => 
                onUpdateStop(index, { ...stop, name })
              }
              hint="Stop Name"
              className="mb-2"
            />
            <Input
              value={stop.dwellTime.toString()}
              onTextChange={(value) =>
                onUpdateStop(index, {
                  ...stop,
                  dwellTime: parseInt(value) || 0
                })
              }
              hint="Duration (minutes)"
              keyboardType="number"
            />
          </stackLayout>
          <button
            col="2"
            className="text-red-500 p-2"
            text="✕"
            onTap={() => onRemoveStop(index)}
          />
        </gridLayout>
      ))}
    </stackLayout>
  );
}