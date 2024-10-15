"use client";

import { useRecipes } from "@/components/context/recipe-context";
import Link from "next/link";

export default function Home() {
  const { recipes } = useRecipes();

  return (
    <div className="grid w-2/3 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 w-full row-start-2 items-center sm:items-start">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="w-full border border-gray-300 rounded-md p-5"
          >
            <div className="mb-5">
              <h1 className="text-2xl font-bold">{recipe.title}</h1>
            </div>
            <div className="flex flex-row mb-3">
              {recipe.tags.map((tag, index) => (
                <div
                  key={index}
                  className="mr-2 bg-gray-200 p-1 px-2 rounded-sm"
                >
                  #{tag}
                </div>
              ))}
            </div>
            {/* <div>
              <h1 className="bg-gray-200 max-w-fit mb-5 p-1 rounded-md">{recipe.tags}</h1>
            </div> */}
            <div>
              <Link
                className="block w-full bg-green-400 text-white text-center text-xl p-2 rounded-md"
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