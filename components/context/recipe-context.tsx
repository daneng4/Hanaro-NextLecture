'use client';

import { useSession } from 'next-auth/react';
import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from 'react';

// Version 타입 정의
type Version = {
  id: number;
  title: string;
  tags: string[];
  cooks: string[];
  materials: string[];
  modifiedTime: string;
};

// Recipe 데이터 타입 정의
type Recipe = {
  id: number;
  title: string;
  tags: string[];
  cooks: string[];
  materials: string[];
  versionList: Version[];
};

// RecipeContext 타입 정의
type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe, email: string) => void;
  editRecipe: (email: string, updatedRecipe: Recipe) => void;
  deleteRecipe: (email: string, recipeId: number) => void;
  popVersion: (email: string, recipeId: number) => void;
  getLastVersion: (recipeId: number) => {
    version: Version | undefined;
    index: number;
  };
};

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => {},
  editRecipe: () => {},
  deleteRecipe: () => {},
  popVersion: () => {},
  getLastVersion: () => ({ version: undefined, index: -1 }),
});

// localStorage에서 레시피를 가져오는 함수
const getRecipesFromLocalStorage = (email: string | undefined): Recipe[] => {
  if (!email) return [];
  const recipes = localStorage.getItem(email);

  if (recipes === null) return [];
  try {
    return JSON.parse(recipes);
  } catch (error) {
    console.error('JSON 파싱 오류:', error);
    return [];
  }
};

// localStorage에 레시피를 저장하는 함수
const saveRecipesToLocalStorage = (
  email: string | undefined | null,
  recipes: Recipe[]
): void => {
  if (!email) return;
  localStorage.setItem(email, JSON.stringify(recipes));
};

const getCurrentTime = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const period = hour < 12 ? '오전' : '오후';

  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour - 12;
  }

  return `${year}. ${month}. ${day}. ${period} ${hour}:${min}:${sec}`;
};

export const RecipeProvider = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      const userRecipes = getRecipesFromLocalStorage(session.user.email);
      setRecipes(userRecipes);
    }
  }, [session]);

  // 레시피 추가
  const addRecipe = (newRecipe: Recipe, email: string): void => {
    const version: Version = {
      id: newRecipe.id,
      title: newRecipe.title,
      tags: newRecipe.tags,
      cooks: newRecipe.cooks,
      materials: newRecipe.materials,
      modifiedTime: getCurrentTime(),
    };

    // versionList에 첫 버전 추가
    newRecipe.versionList = [version];

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    saveRecipesToLocalStorage(email, updatedRecipes);
  };

  // 레시피 수정
  const editRecipe = (email: string, updatedRecipe: Recipe): void => {
    const version: Version = {
      id: updatedRecipe.id,
      title: updatedRecipe.title,
      tags: updatedRecipe.tags,
      cooks: updatedRecipe.cooks,
      materials: updatedRecipe.materials,
      modifiedTime: getCurrentTime(),
    };

    // versionList에 새로운 버전 추가
    updatedRecipe.versionList.push(version);

    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    saveRecipesToLocalStorage(email, updatedRecipes);
  };

  // 레시피 삭제
  const deleteRecipe = (email: string, recipeId: number): void => {
    const afterDeleteRecipe = recipes.filter(
      (recipe) => recipe.id !== recipeId
    );
    setRecipes(afterDeleteRecipe);
    saveRecipesToLocalStorage(email, afterDeleteRecipe);
  };

  // 마지막 버전 제거 (길이가 1 이상일 때만 pop)
  const popVersion = (email: string, recipeId: number): void => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === recipeId && recipe.versionList.length > 1) {
        recipe.versionList.pop();
      } else {
        alert('첫 버전입니다!!');
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
    saveRecipesToLocalStorage(email, updatedRecipes);
  };

  // versionList에서 마지막 버전 가져오기
  const getLastVersion = (
    recipeId: number
  ): { version: Version | undefined; index: number } => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    const index = recipe ? recipe.versionList.length - 1 : -1;
    const version = recipe ? recipe.versionList[index] : undefined;
    return { version, index };
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        addRecipe,
        editRecipe,
        deleteRecipe,
        popVersion,
        getLastVersion,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// 레시피 데이터를 사용하는 커스텀 훅
export const useRecipes = () => useContext(RecipeContext);
