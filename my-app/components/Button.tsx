"use client"

import Link from 'next/link'

export default function Button({ href = "/cards" }: { href?: string }) {
    return(
        <Link href={href}>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 hover:scale-110 transition-all duration-200 ease-in-out active:scale-95">
                Start
            </button>
        </Link>
    )
}