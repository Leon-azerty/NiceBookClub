import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Check } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function ValidateModification({
  setIsEditing,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  const updatePassword = () => {
    setIsEditing(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant={'outline'}>
          <Check />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update password?</DialogTitle>
          <DialogDescription>
            <div>
              <p>
                You will receive an email, enter the code to valiate the update.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row-reverse">
          <div className="flex gap-2">
            <Button variant={'outline'} onClick={() => updatePassword()}>
              Yes
            </Button>
            <Button variant={'outline'} onClick={() => setIsEditing(false)}>
              Cancel the modifications
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
