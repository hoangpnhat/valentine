'use client'
import dynamic from 'next/dynamic';

const Valentine3DGraphWithNoSSR = dynamic(
  () => import('@/components/Valentine3DGraph'),
  { ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <p className="text-pink-600 text-lg">Loading our love memories...</p>
    </div>}
);
export default function Home() {
  return (
    <main>
      <Valentine3DGraphWithNoSSR />
    </main>
  )
}