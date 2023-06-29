import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center '>
      <h1 className="text-3xl sm:text-5xl font-bold mb-12 text-dark-blue border-2 p-8 rounded-md text-zinc-500">
        {" "}
        Welcome to my mini project...{" "}
      </h1>
      <div className='text-sm text-zinc-500'>In'am Nurul Fuady</div>
      <div className='text-sm text-zinc-500'>21/479707/TK/52919</div>
      <div className='p-5 m-5 text-zinc-500'>Project ini dibuat sebagai syarat atau tugas akhir dari Mata Kuliah Teknologi Basis Data. Project ini dilengkapi dengan CRUD lengkap dari table book, sedangkan table yang lain saat ini masih non-active. Program CRUD dari table menggunakan TCL dalam method DELETE karena constraint terhadap table lain.</div>
    </div>
  )
}
