import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Button } from "./ui/button";

const OtpDialog = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    // verify OTP
  };

  const handleResendOTP = () => {
    // resend OTP
  };
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog bg-surface-a10">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center h2">Enter OTP</div>
                <Image
                  src="assets/icons/close.svg"
                  alt="close"
                  height={20}
                  width={20}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="subtitle-1">
              Please enter the 6-digit code sent to{" "}
              <span className="text-primary-a0">{email}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <InputOTP maxLength={6}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot
                index={0}
                className="text-dark-a0 justify-center flex border-2 rounded-lg"
              />
              <InputOTPSlot
                index={1}
                className=" text-dark-a0 justify-center flex border-2 rounded-lg"
              />
              <InputOTPSlot
                index={2}
                className="text-dark-a0  justify-center flex border-2 rounded-lg"
              />
              <InputOTPSlot
                index={3}
                className="text-dark-a0 justify-center flex border-2 rounded-lg"
              />
              <InputOTPSlot
                index={4}
                className="text-dark-a0 justify-center flex border-2 rounded-lg"
              />
              <InputOTPSlot
                index={5}
                className="text-dark-a0 justify-center flex border-2 rounded-lg"
              />
            </InputOTPGroup>
          </InputOTP>
          <AlertDialogFooter>
            <div className="flex-1 flex-col">
              <AlertDialogAction
                className="shad-submit-btn w-full"
                onClick={handleSubmit}
                type="button"
                disabled={isLoading}
              >
                Continue
                {isLoading && (
                  <Image
                    src="/assets/icons/loader.svg"
                    alt="loader"
                    height={24}
                    width={24}
                    className="animate-spin"
                  />
                )}
              </AlertDialogAction>
              <div className="subtitle-2 text-center">
                Didn't get the code
                <Button variant="link" className="text-primary-a10">
                  Resend OTP
                </Button>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OtpDialog;
