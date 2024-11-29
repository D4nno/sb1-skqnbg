import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../navigation/NavigationParamList";
import { TripForm } from "./TripForm";
import { Stop } from "../../types/trip";

type LandingScreenProps = {
  route: RouteProp<MainStackParamList, "Landing">;
  navigation: FrameNavigationProp<MainStackParamList, "Landing">;
};

export function LandingScreen({ navigation }: LandingScreenProps) {
  const handleSubmit = (stops: Stop[]) => {
    navigation.navigate("MapView", { stops });
  };

  return (
    <scrollView className="bg-white">
      <stackLayout className="p-4">
        <label className="text-2xl font-bold mb-4">Plan Your Trip</label>
        <TripForm onSubmit={handleSubmit} />
      </stackLayout>
    </scrollView>
  );
}