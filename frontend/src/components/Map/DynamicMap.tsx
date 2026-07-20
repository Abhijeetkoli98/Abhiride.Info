'use client';

import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('./InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[380px] shimmer-bg rounded-3xl flex items-center justify-center text-slate-400 font-bold text-xs">
      Loading Interactive GPS Engine...
    </div>
  ),
});

export default InteractiveMap;
