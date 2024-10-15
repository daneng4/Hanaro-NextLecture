'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DetailRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { recipes } = useRecipes();
  const curRecipe = recipes.find((recipe) => recipe.id === +recipeId);
  let cookSeq = 1;
  return (
    <div className='w-full sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <div className='text-2xl font-bold mb-5'>{`< ${curRecipe?.title} >`}</div>
      <div className='text-xl mb-3'>조리과정</div>
      <div>
        {curRecipe?.cooks.map((cook) => (
          <>
            <div
              key={cook}
              className='font-bold mb-2 w-full'
            >{`STEP ${cookSeq++}: ${cook}`}</div>
            <div className='mb-3'>
              <div className='flex flex-row w-fit justify-start'>
                <Input
                  className='border border-gray-400 mr-3'
                  type='text'
                  placeholder='시간(초)'
                ></Input>
                <Button className='bg-blue-500'>타이머시작</Button>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className='flex flex-row mb-4'>
        {curRecipe?.tags.map((tag) => (
          <>
            <div className='bg-gray-300 mr-3 mt-3 p-1 rounded-md'>{`#${tag}`}</div>
          </>
        ))}
      </div>
      <div className='text-xl mb-3'>재료</div>
      <div className='flex flex-col mb-4'>
        {curRecipe?.materials.map((mat) => (
          <>
            <ul>
              <li className='mb-1'>{`✅  ${mat}`}</li>
            </ul>
          </>
        ))}
      </div>
      <div className='text-xl mb-3'>수정 기록</div>
    </div>
  );
}
