'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div>
      <div>오류가 발생했습니다.</div>
      <Button onClick={() => router.replace('/')}> 홈으로 가기 </Button>
    </div>
  );
}
