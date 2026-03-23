"use client"

import Link from 'next/link'

export default function Button() {
    return(
        <div>
            <button className="bg-linear-to-bl from-violet-500 to-fuchsia-500 text-4xl font-medium px-7 py-3 rounded-lg ease-in-out hover:scale-110 focus:outline-2 focus:outline-offset-2 focus:outline-voilet-400 active:bg-gray-400 transition duration-500">
                <Link href="">Start</Link>
            </button>
        </div>
    )
}