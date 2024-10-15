"use client";

import { useRecipes } from "@/components/context/recipe-context";

export default function DetailRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { recipes } = useRecipes();
  const curRecipe = recipes.find((recipe) => recipe.id === +recipeId);
  let cookSeq = 1;
  return (
    <div className="w-full sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-blue-200 text-2xl font-bold mb-5">
        {curRecipe?.title}
      </div>
      <div className="text-xl mb-3">조리과정</div>
      <div>
        {curRecipe?.cooks.map((cook) => (
          <div
            key={cook}
            className="font-bold mb-2"
          >{`STEP ${cookSeq++}: ${cook}`}</div>
        ))}
        <div></div>
      </div>
    </div>
  );
}
