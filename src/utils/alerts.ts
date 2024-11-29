import { alert } from "@nativescript/core/ui/dialogs";

export const showError = async (title: string, message: string) => {
  await alert({
    title,
    message,
    okButtonText: "OK"
  });
};

export const showSuccess = async (title: string, message: string) => {
  await alert({
    title,
    message,
    okButtonText: "OK"
  });
};