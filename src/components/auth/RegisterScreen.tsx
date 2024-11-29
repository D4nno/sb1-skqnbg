import * as React from "react";
import { RouteProp } from "@react-navigation/core";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { Switch } from "@nativescript/core";
import { MainStackParamList } from "../../navigation/NavigationParamList";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { signUp } from "../../services/firebase";
import { showError, showSuccess } from "../../utils/alerts";
import { validateEmail, validatePassword } from "../../utils/validation";

type RegisterScreenProps = {
  route: RouteProp<MainStackParamList, "Register">;
  navigation: FrameNavigationProp<MainStackParamList, "Register">;
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = (): string | null => {
    if (!name.trim()) return "Please enter your name";
    if (!email.trim()) return "Please enter your email";
    if (!validateEmail(email)) return "Please enter a valid email";
    if (!password) return "Please enter a password";
    if (!validatePassword(password)) 
      return "Password must be at least 8 characters long and contain at least one number and one letter";
    if (password !== confirmPassword) return "Passwords do not match";
    if (!acceptTerms) return "Please accept the terms and conditions";
    return null;
  };

  const handleRegister = async () => {
    const error = validateForm();
    if (error) {
      showError("Validation Error", error);
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password);
      await showSuccess("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      showError("Registration Failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <flexboxLayout className="h-full bg-white p-4">
      <stackLayout className="w-full">
        <label className="text-2xl font-bold text-center mb-8">
          Create Account
        </label>

        <Input
          value={name}
          onTextChange={setName}
          hint="Full Name"
          className="mb-4"
        />

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
          className="mb-4"
        />

        <Input
          value={confirmPassword}
          onTextChange={setConfirmPassword}
          hint="Confirm Password"
          secure={true}
          className="mb-4"
        />

        <flexboxLayout className="mb-4 items-center">
          <Switch
            checked={acceptTerms}
            onCheckedChange={(args) => setAcceptTerms(args.value)}
          />
          <label className="ml-2">I accept the Terms and Conditions</label>
        </flexboxLayout>

        <Button
          text={isLoading ? "Creating Account..." : "Register"}
          onTap={handleRegister}
          className="mb-4"
        />

        <Button
          text="Already have an account? Login"
          onTap={() => navigation.navigate("Login")}
          variant="link"
        />
      </stackLayout>
    </flexboxLayout>
  );
}