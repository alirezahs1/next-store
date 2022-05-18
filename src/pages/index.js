import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      Visit Product Page &nbsp; 
	  <Link passHref={true} href="/products/1">
		<a className="text-rose-500 hover:text-rose-700">
			Here
		</a>
	  </Link>
    </div>
  )
}
