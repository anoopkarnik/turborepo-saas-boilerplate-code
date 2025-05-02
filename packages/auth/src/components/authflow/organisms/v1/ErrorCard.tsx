import { Card,  CardFooter, CardHeader } from '@repo/ui/molecules/shadcn/card';
import { BsExclamationTriangle } from 'react-icons/bs';
import { Button } from '@repo/ui/atoms/shadcn/button';
import { useRouter } from 'next/navigation';
import { ErrorCardProps } from '../../../../utils/typescript';

const ErrorCard = ({errorMessage}:ErrorCardProps) => {

  const router = useRouter();

  return (
    <Card className='w-[400px]  text-black shadow-xl shadow-white/20'>
      <CardHeader>
        <div className='text-4xl font-bold text-center flex items-center justify-center gap-4 my-4'>
          <BsExclamationTriangle/> Error
        </div>
        <div className='text-md font-extralight text-center'>{errorMessage || "Oops! Something went wrong!"}</div>
      </CardHeader>
      <CardFooter className='flex justify-center'>
        <Button onClick={()=>router.push('/sign-in')} variant={'blank'}
        className='text-sm text-center text-black/60 hover:text-black cursor-pointer hover:underline'>
          Back to login
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard;