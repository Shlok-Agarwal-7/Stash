import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const OtpDialog = ({ email }: { email: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog bg-surface-a10">
          <AlertDialogHeader>
            <AlertDialogTitle className="h2">Enter OTP</AlertDialogTitle>
            <AlertDialogDescription className="subtitle-1">
              Please enter the 6-digit code sent to {email}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <InputOTP maxLength={6}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot
                index={0}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
              <InputOTPSlot
                index={1}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
              <InputOTPSlot
                index={2}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
              <InputOTPSlot
                index={3}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
              <InputOTPSlot
                index={4}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
              <InputOTPSlot
                index={5}
                className="text-primary-a0 ring-2 ring-primary-a10 justify-center flex border-2 rounded-xl"
              />
            </InputOTPGroup>
          </InputOTP>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OtpDialog;
