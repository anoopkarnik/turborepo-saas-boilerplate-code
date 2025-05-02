import { SettingsIcon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../../../molecules/shadcn/sheet';
import { Switch } from '../../../molecules/shadcn/switch';
import { Button } from '../../../atoms/shadcn/button';
import { Input } from '../../../atoms/shadcn/input';

const Settings = ({ data }: { data: any }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const verified = localStorage.getItem('isVerified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const verifyPassword = async () => {
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();

    if (result.success) {
      localStorage.setItem('isVerified', 'true');
      setIsVerified(true);
      setError('');
    } else {
      setError('Incorrect password.');
      setIsVerified(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && triggerRef.current) {
      // Blur to prevent scroll
      triggerRef.current.blur();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <div
          ref={triggerRef}
          className='fixed bottom-4 left-4 flex items-center justify-center gap-2 p-4 
          rounded-full bg-sidebar cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300'
        >
          <SettingsIcon className='w-6 h-6 text-primary' />
        </div>
      </SheetTrigger>
      <SheetContent>
        {!isVerified ? (
          <div className="p-4">
            <SheetHeader>
              <SheetTitle>Enter Password</SheetTitle>
              <SheetDescription>Please enter your password to access settings.</SheetDescription>
            </SheetHeader>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              className='mt-4'
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <SheetFooter className="mt-4">
              <Button type="button" onClick={verifyPassword}>Verify</Button>
            </SheetFooter>
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Edit Settings</SheetTitle>
              <SheetDescription>Change your settings here</SheetDescription>
            </SheetHeader>
            <div className='flex items-center justify-center gap-2 p-4'>
              <Switch onClick={data.handleConstantsType} />
              <p className='text-xs font-light text-gray-500 ml-2'>{data.constantsType}</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
