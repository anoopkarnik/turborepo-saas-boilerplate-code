import { Card, CardContent } from '@repo/ui/molecules/shadcn/card';
import { LoadingCardProps } from '@repo/auth/utils/typescript';
import { BeatLoader } from 'react-spinners';

const LoadingCard = ({title="Loading",description="Please wait while we are loading the page!"}:LoadingCardProps) => {

  return (
    <div className='w-full flex items-center justify-center mt-10 min-h-full'>
      <Card className='flex items-center justify-center  shadow-xl shadow-white/20 p-4'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='text-4xl font-black animate-pulse text-center mb-4'>
              {title}
            </div>
            <div className='text-lg animate-pulse text-center'>
              {description}
            </div>
            <BeatLoader size={20} color='white'/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoadingCard;