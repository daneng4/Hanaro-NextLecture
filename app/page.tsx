'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { recipes } = useRecipes();
  const { data: session } = useSession();

  if (session?.user === undefined) {
    return (
      <div className='flex flex-col w-2/3 items-center bg-slate-100 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
        <div className='w-full text-center text-3xl'>먼저 로그인해주세요!</div>
      </div>
    );
  }
  if (recipes.length === 0) {
    return (
      <div className='flex flex-col w-2/3 items-center bg-slate-100 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
        <div className='w-full text-center text-3xl'>
          레시피가 없습니다. 레시피를 추가해주세요!
        </div>
      </div>
    );
  }

  return (
    <div className='grid w-2/3 sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 w-full row-start-2 items-center sm:items-start'>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className='w-full border border-gray-300 rounded-md p-5'
          >
            <div className='mb-5'>
              <h1 className='text-2xl font-bold'>{recipe.title}</h1>
            </div>
            <div className='flex flex-row mb-3'>
              {recipe.tags.map((tag, index) => (
                <div
                  key={index}
                  className='mr-2 bg-gray-200 p-1 px-2 rounded-sm'
                >
                  #{tag}
                </div>
              ))}
            </div>
            <div>
              <Link
                className='block w-full bg-green-400 text-white text-center text-xl p-2 rounded-md'
                href={`/detailRecipe/${recipe.id}`}
              >
                자세히보기
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
