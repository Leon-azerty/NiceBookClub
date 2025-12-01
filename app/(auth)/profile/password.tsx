'use client';

import { Input } from '@/components/ui/input';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import CancelModifications from './cancelModifications';
import ValidateModification from './validateModification';
export default function Password() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section>
      <div className="flex gap-2">
        <p>password : </p>
        {isEditing ? <Input className="max-w-60" /> : <p>*********</p>}
        {isEditing ? (
          <>
            <ValidateModification setIsEditing={setIsEditing} />
            <CancelModifications setIsEditing={setIsEditing} />
          </>
        ) : (
          <Edit
            onClick={() => {
              setIsEditing(true);
            }}
          />
        )}
      </div>
    </section>
  );
}
