"use client";

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

import { toast } from "sonner";

import Image from "next/image";
import { Button } from "./ui/button";
import { sendEmailOTP, verifyOTP } from "@/lib/userActions/user.actions";
import { useRouter } from "next/navigation";

const OtpDialog = ({
  email,
  accountID,
}: {
  email: string;
  accountID: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionID = await verifyOTP({ accountID, password });

      if (sessionID) {
        router.push("/dashboard");
        toast.success("Welcome To Your Stash");
      }
    } catch (error) {
      toast.error("Invalid OTP,Please check your OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    await sendEmailOTP({ email });
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
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
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
                <Button
                  variant="link"
                  className="text-primary-a10"
                  onClick={handleResendOTP}
                >
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
