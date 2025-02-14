'use client'
import dynamic from 'next/dynamic';

const Valentine3DGraphWithNoSSR = dynamic(
  () => import('@/components/Valentine3DGraph'),
  { ssr: false }
);
export default function Home() {
  return (
    <main>
      <Valentine3DGraphWithNoSSR />
    </main>
  )
}