import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleX } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function CancelModifications({
  setIsEditing,
}: {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant={'outline'}>
          <CircleX />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel modifications?</DialogTitle>
          <DialogDescription>
            <div>
              <p>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row-reverse">
          <div className="flex gap-2">
            <Button variant={'outline'} onClick={() => setIsEditing(false)}>
              Continue updating password
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
