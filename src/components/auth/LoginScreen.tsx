import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../navigation/NavigationParamList";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { signIn } from "../../services/firebase";
import { showError } from "../../utils/alerts";

type LoginScreenProps = {
  route: RouteProp<MainStackParamList, "Login">;
  navigation: FrameNavigationProp<MainStackParamList, "Login">;
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn(email, password);
      navigation.navigate("Landing");
    } catch (error) {
      showError("Login Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <flexboxLayout className="h-full bg-white p-4">
      <stackLayout className="w-full">
        <label className="text-2xl font-bold text-center mb-8">
          My Tour Manager
        </label>
        
        <Input
          value={email}
          onTextChange={setEmail}
          hint="Email"
          keyboardType="email"
          className="mb-4"
        />

        <Input
          value={password}
          onTextChange={setPassword}
          hint="Password"
          secure={true}
          className="mb-6"
        />

        <Button
          text={isLoading ? "Logging in..." : "Login"}
          onTap={handleLogin}
          className="mb-4"
        />

        <Button
          text="Create Account"
          onTap={() => navigation.navigate("Register")}
          variant="link"
        />

        <Button
          text="Forgot Password?"
          onTap={() => navigation.navigate("ForgotPassword")}
          variant="link"
        />
      </stackLayout>
    </flexboxLayout>
  );
}