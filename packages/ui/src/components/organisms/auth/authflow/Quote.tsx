import {QuoteProps} from "@repo/auth/utils/typescript"

const Quote = ({quote}:{quote:QuoteProps}) => {
  return (
    <div className='h-screen flex justify-center items-center flex-col '>
        <div className='flex flex-col justify-center text-left mx-[10%]'>
            <div className='text-4xl font-bold '>
                {quote.title}
            </div>
            <div className='max-w-md text-left text-2xl font-semibold mt-4 '>
                {quote.author}
            </div>
            <div className='max-w-md text-left text-xl text-gray-400  '>
               {quote.credential}
            </div>
        </div>
    </div>
  )
}

export default Quote