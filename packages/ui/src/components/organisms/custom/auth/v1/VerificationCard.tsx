import { FormResult } from './FormResult';
import { Card, CardContent, CardFooter, CardHeader } from '../../../../molecules/shadcn/card';

import { BeatLoader } from 'react-spinners';
import { VerificationCardProps } from '@repo/ts-types/auth/v1';
import { useRouter } from 'next/navigation';

const VerificationCard = ({errorMessage,successMessage}:VerificationCardProps) => {
  const router = useRouter();
  return (
    <Card className='w-[400px] bg-white text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-6xl font-bold text-center flex items-center justify-center gap-4 my-4'>
           Verification
        </div>
        <div className='text-md font-extralight text-center'>Confirming your verification!</div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center'>
          {(!successMessage && !errorMessage) && <BeatLoader size={20} color='black'/>}
          {!successMessage && <FormResult type="error" message={errorMessage }/>}
          <FormResult type="success" message={successMessage}/>
        </div>
      </CardContent>
      <CardFooter className='flex justify-center'>
      <button onClick={()=>router.push('/sign-in')} className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>
          Back to Login
      </button>
      </CardFooter>
    </Card>
  )
}

export default VerificationCard;