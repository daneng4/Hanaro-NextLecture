'use client';

import { useRecipes } from '@/components/context/recipe-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { recipes, editRecipe, getLastVersion } = useRecipes();
  const curRecipe = recipes.find((recipe) => recipe.id === +recipeId);
  const { version: lastVersion } = getLastVersion(+recipeId); // 현재 버전 가져오기

  const [title, setTitle] = useState(lastVersion?.title || '');
  const [cooks, setCooks] = useState<string[]>(lastVersion?.cooks || []);
  const [materials, setMaterials] = useState<string[]>(
    lastVersion?.materials || []
  );
  const [tags, setTags] = useState<string[]>(lastVersion?.tags || []);

  const [newMaterial, setNewMaterial] = useState('');
  const [newCook, setNewCook] = useState('');
  const [newTag, setNewTag] = useState('');

  // 재료 추가
  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setMaterials([...materials, newMaterial]);
      setNewMaterial('');
    }
  };

  // 조리 과정 추가
  const handleAddCook = () => {
    if (newCook.trim()) {
      setCooks([...cooks, newCook]);
      setNewCook('');
    }
  };

  // 태그 추가
  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  // 재료 삭제
  const handleRemoveMaterial = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  // 조리 과정 삭제
  const handleRemoveCook = (index: number) => {
    setCooks(cooks.filter((_, i) => i !== index));
  };

  // 태그 삭제
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // 레시피 수정 핸들러
  const handleEditRecipe = () => {
    const modifiedTime = new Date().toISOString();

    const updatedVersion = {
      id: lastVersion ? lastVersion.id + 1 : 1,
      title,
      cooks,
      materials,
      tags: curRecipe?.tags || [],
      modifiedTime,
    };

    const updatedRecipe = {
      ...curRecipe,
      id: curRecipe?.id ?? recipes.length + 1, // id가 없으면 새로 생성
      title,
      cooks,
      materials,
      tags,
      versionList: [...(curRecipe?.versionList || []), updatedVersion],
    };

    if (session?.user?.email) {
      editRecipe(session.user.email, updatedRecipe);
      alert('레시피가 수정되었습니다.');
    }

    router.replace('/');
  };

  return (
    <div className='items-center w-full sm:p-10 font-[family-name:var(--font-geist-sans)]'>
      <div className='text-2xl font-bold mb-5'>레시피 수정</div>
      <div>
        <label className='block mb-2 font-bold'>레시피 제목</label>
        <Input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full p-2 border mb-4'
        />
      </div>

      <div>
        <label className='block mb-2 font-bold'>재료 목록</label>
        <div className='flex mb-4'>
          <Input
            type='text'
            value={newMaterial}
            onChange={(e) => setNewMaterial(e.target.value)}
            placeholder='재료를 입력하세요'
            className='w-full p-2 border'
          />
          <Button onClick={handleAddMaterial} className='ml-2 p-2 bg-blue-500'>
            추가
          </Button>
        </div>
        <ul>
          {materials.map((mat, index) => (
            <li key={index} className='mb-2'>
              {mat}{' '}
              <button
                onClick={() => handleRemoveMaterial(index)}
                className='text-red-500'
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label className='block mb-2 font-bold'>조리 과정</label>
        <div className='flex mb-4'>
          <Input
            type='text'
            value={newCook}
            onChange={(e) => setNewCook(e.target.value)}
            placeholder='조리 과정을 입력하세요'
            className='w-full p-2 border'
          />
          <Button onClick={handleAddCook} className='ml-2 p-2 bg-blue-500'>
            추가
          </Button>
        </div>
        <ol>
          {cooks.map((step, index) => (
            <li key={index} className='mb-2'>
              {`${index + 1}. ${step}`}{' '}
              <button
                onClick={() => handleRemoveCook(index)}
                className='text-red-500'
              >
                - 삭제
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <label className='block mb-2 font-bold'>태그</label>
        <div className='flex mb-4'>
          <Input
            type='text'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder='조리 과정을 입력하세요'
            className='w-full p-2 border'
          />
          <Button onClick={handleAddTag} className='ml-2 p-2 bg-blue-500'>
            추가
          </Button>
        </div>
        <ul>
          {tags.map((tag, index) => (
            <li key={index} className='mb-2'>
              {tag}{' '}
              <button
                onClick={() => handleRemoveTag(index)}
                className='text-red-500'
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex flex-row justify-between gap-5 mt-5'>
        <Button
          onClick={handleEditRecipe}
          className='mt-4 p-2 bg-blue-500 text-white '
        >
          레시피 수정
        </Button>
      </div>
    </div>
  );
}
