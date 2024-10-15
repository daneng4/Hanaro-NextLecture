'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function DetailRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { recipes } = useRecipes();
  const [timers, setTimers] = useState<{ [key: number]: number | '' }>({});

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
      <div className='text-xl mb-3'>수정 기록</div>
    </div>
  );
}
