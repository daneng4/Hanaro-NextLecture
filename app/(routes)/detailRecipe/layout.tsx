import { PropsWithChildren } from "react";

export default function DetailRecipeLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-red-200 flex flex-col w-2/3 items-center">
      {children}
    </div>
  );
}
