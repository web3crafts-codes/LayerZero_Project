'use client';

import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function ThreeSceneWrapper() {
    return <ThreeScene />;
}
