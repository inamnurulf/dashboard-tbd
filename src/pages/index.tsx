import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex justify-center items-center '>
      <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue border-2 p-8 rounded-md text-zinc-500">
        {" "}
        Welcome to my mini project...{" "}
      </h1>
    </div>
  )
}
