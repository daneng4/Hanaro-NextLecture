'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddRecipe() {
  const { data: session } = useSession();
  const route = useRouter();
  const { recipes, addRecipe } = useRecipes();

  // 레시피 정보 상태 관리
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [cooks, setCooks] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newCooks, setNewCooks] = useState('');
  const [newMaterial, setNewMaterial] = useState('');

  // 레시피 추가 핸들러
  const handleAddRecipe = () => {
    const newRecipe = {
      id: recipes.length + 1,
      title,
      tags,
      cooks,
      materials,
    };

    console.log('ADDRECIPE');
    addRecipe(newRecipe, session?.user?.email as string); // 레시피 추가
    alert('레시피가 저장되었습니다.');
    route.push('/');
  };

  const goBack = () => {
    route.push('/');
  };

  // 각각의 항목 추가 핸들러
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag(''); // 입력 필드 초기화
    }
  };

  const addCook = () => {
    if (newCooks && !cooks.includes(newCooks)) {
      setCooks([...cooks, newCooks]);
      setNewCooks(''); // 입력 필드 초기화
    }
  };

  // 재료 추가 핸들러
  const addMaterial = () => {
    if (newMaterial && !materials.includes(newMaterial)) {
      setMaterials([...materials, newMaterial]);
      setNewMaterial(''); // 입력 필드 초기화
    }
  };

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mb-10'>새 레시피 추가</h1>
      </div>
      <div className='flex flex-col w-full mb-8'>
        <h1 className='font-extrabold'>레시피 제목</h1>
        <Input
          placeholder='레시피 제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-gray-300 p-3 mt-2 h-13'
        ></Input>
      </div>

      <div className='mb-8'>
        <h1 className='font-extrabold'>태그</h1>
        <div className='flex flex-row'>
          <Input
            placeholder='태그를 입력하세요'
            value={newTag}
            className='border border-gray-300 p-3 mt-2 mr-3 h-13'
            onChange={(e) => setNewTag(e.target.value)}
          ></Input>
          <Button onClick={addTag} className='bg-blue-400 mt-2 h-13'>
            추가
          </Button>
        </div>
        <div>{tags.join(', ')}</div>
      </div>

      <div className='mb-8'>
        <h1 className='font-extrabold'>재료 목록</h1>
        <div className='flex flex-row'>
          <Input
            placeholder='재료를 입력하세요'
            value={newMaterial}
            onChange={(e) => setNewMaterial(e.target.value)}
            className='border border-gray-300 p-3 mt-2 mr-3 h-13'
          ></Input>
          <Button onClick={addMaterial} className='bg-blue-400 mt-2 h-13'>
            추가
          </Button>
        </div>
        <div>{materials.join(', ')}</div>
      </div>

      <div className='mb-10'>
        <h1 className='font-extrabold'>조리 과정</h1>
        <div className='flex flex-row'>
          <Input
            placeholder='조리 과정을 입력하세요'
            value={newCooks}
            className='border border-gray-300 p-3 mt-2 mr-3 h-13'
            onChange={(e) => setNewCooks(e.target.value)}
          ></Input>
          <Button onClick={addCook} className='bg-blue-400 mt-2 h-13'>
            추가
          </Button>
        </div>
        <div>{cooks.join(', ')}</div>
      </div>

      <div className='flex justify-between'>
        <Button onClick={handleAddRecipe} className='bg-blue-400 w-full mr-10'>
          레시피 저장
        </Button>
        <Button onClick={goBack} className='bg-gray-400 w-full'>
          취소
        </Button>
      </div>
    </>
  );
}
