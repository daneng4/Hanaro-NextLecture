"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";
import { useSession } from "next-auth/react";

// Recipe 데이터 타입 정의
type Recipe = {
  id: number;
  title: string;
  tags: string[];
  cooks: string[];
  materials: string[];
};

// RecipeContext 타입 정의
type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe, email: string) => void;
  editRecipe: (email: string, updatedRecipe: Recipe) => void;
};

const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  addRecipe: () => {},
  editRecipe: () => {},
});

// localStorage에서 레시피를 가져오는 함수
const getRecipesFromLocalStorage = (email: string | undefined): Recipe[] => {
  if (!email) return [];
  const recipes = localStorage.getItem(email);

  // localStorage에서 가져온 값이 null인 경우
  if (recipes === null) return [];
  try {
    // JSON 파싱
    return JSON.parse(recipes);
  } catch (error) {
    console.error("JSON 파싱 오류:", error);
    return []; // 파싱 오류가 발생하면 빈 배열 반환
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
    console.log("addRecipe 호출됨");
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    saveRecipesToLocalStorage(email, updatedRecipes); // 이메일을 key로 사용
  };

  // 레시피 수정
  const editRecipe = (email: string, updatedRecipe: Recipe): void => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    saveRecipesToLocalStorage(email, updatedRecipes); // 이메일을 key로 사용
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, editRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

// 레시피 데이터를 사용하는 커스텀 훅
export const useRecipes = () => useContext(RecipeContext);
