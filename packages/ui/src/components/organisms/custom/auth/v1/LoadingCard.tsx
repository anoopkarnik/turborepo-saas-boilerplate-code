import { Card, CardContent } from '../../../../molecules/shadcn/card';
import { BeatLoader } from 'react-spinners';
import { LoadingCardProps } from '@repo/ts-types/auth/v1';

const LoadingCard = ({title,description}:LoadingCardProps) => {

  return (
    <div className='w-full flex items-center justify-center mt-10 bg-black min-h-full'>
      <Card className='flex items-center justify-center bg-black text-white shadow-xl shadow-white/20 p-4'>
        <CardContent>
          <div className='flex flex-col items-center justify-center gap-4'>
            <div className='text-4xl font-black animate-pulse text-center mb-4'>
              Loading {title}
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