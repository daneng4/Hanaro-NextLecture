'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DetailRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { recipes, deleteRecipe, getLastVersion, popVersion } = useRecipes();
  const [timers, setTimers] = useState<{ [key: number]: number | '' }>({});
  const { data: session } = useSession();
  const router = useRouter();

  const userEmail = session?.user!.email;
  const { version, index } = getLastVersion(+recipeId);
  const curRecipe = recipes.find((recipe) => recipe.id === +recipeId);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setTimers((prev) => ({
      ...prev,
      [index]: value === '' ? '' : Number(value), // cook별로 seconds 관리
    }));
  };

  const startTimer = (cook: string, index: number) => {
    const seconds = timers[index];
    if (typeof seconds === 'number' && seconds > 0) {
      setTimeout(() => {
        alert(`${cook} : ${seconds}초가 지났습니다!`);
      }, seconds * 1000);
    } else {
      alert('유효한 숫자를 입력하세요!');
    }
  };

  const goBack = () => {
    router.push('/');
  };

  const removeCheck = () => {
    if (confirm('레시피를 삭제하시겠습니까?') === true) {
      return true;
    }
    return false;
  };

  return (
    <div className='items-center sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <div className='text-2xl font-bold mb-5'>{`< ${curRecipe?.title} >`}</div>
      <div className='text-xl mb-3'>조리과정</div>
      <div>
        {curRecipe?.cooks.map((cook, index) => (
          <>
            <div
              key={index}
              className='font-bold mb-2 w-full'
            >{`STEP ${index + 1}: ${cook}`}</div>
            <div className='mb-3'>
              <div className='flex flex-row w-fit justify-start'>
                <Input
                  className='border border-gray-400 mr-3'
                  type='text'
                  value={timers[index] || ''}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder='시간(초)'
                ></Input>
                <Button
                  className='bg-blue-500'
                  onClick={() => startTimer(cook, index)}
                >
                  타이머시작
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className='flex flex-row mb-4'>
        {curRecipe?.tags.map((tag, index) => (
          <>
            <div
              key={index}
              className='bg-gray-300 mr-3 mt-3 p-1 rounded-md'
            >{`#${tag}`}</div>
          </>
        ))}
      </div>
      <div className='text-xl mb-3'>재료</div>
      <div className='flex flex-col mb-4'>
        {curRecipe?.materials.map((mat, index) => (
          <div key={index}>
            <ul>
              <li className='mb-1'>{`✅  ${mat}`}</li>
            </ul>
          </div>
        ))}
      </div>
      <div className='text-xl mb-3'>최신 버전</div>
      <div className='flex flex-row mb-3'>
        <div className='font-bold mt-2'>{`버전 ${index + 1} (${version?.modifiedTime})`}</div>
        <Button
          className='ml-2 bg-purple-400'
          onClick={() => popVersion(userEmail!, +recipeId)}
        >
          이전 버전으로
        </Button>
      </div>
      <div className='flex flex-row justify-between'>
        <Button className='bg-blue-500' asChild>
          <Link href={`/editRecipe/${recipeId}`}>수정</Link>
        </Button>
        <Button
          className='bg-red-500'
          onClick={() => {
            if (removeCheck()) {
              deleteRecipe(userEmail!, +recipeId);
              alert('레시피가 삭제되었습니다!');
              goBack();
            }
          }}
        >
          삭제
        </Button>
        <Button className='bg-gray-500' onClick={goBack}>
          목록으로
        </Button>
      </div>
    </div>
  );
}
