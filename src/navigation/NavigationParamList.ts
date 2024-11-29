export type MainStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Landing: undefined;
  MapView: {
    stops: Array<{
      name: string;
      location: {
        latitude: number;
        longitude: number;
      };
      dwellTime: number;
    }>;
  };
  RouteDetails: {
    routeId: string;
  };
  InfoHub: {
    routeId: string;
  };
  FinalDestination: {
    destinationId: string;
  };
};