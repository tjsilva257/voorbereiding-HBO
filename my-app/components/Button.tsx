"use client"

import Link from 'next/link'

export default function Button() {
    return(
        <div className="flex items-center justify-center min-h-screen">
            <button className="bg-red-300 px-5 py-2 rounded-lg hover:scale-110 transition duration-75 ease-in-out text-4xl font-medium">Start</button>
        <div>
            <button className="bg-linear-to-bl from-violet-500 to-fuchsia-500 text-4xl font-medium px-7 py-3 rounded-lg ease-in-out hover:scale-110 focus:outline-2 focus:outline-offset-2 focus:outline-voilet-400 active:bg-gray-400 transition duration-500">
                <Link href="">Start</Link>
            </button>
        </div>
    )
}