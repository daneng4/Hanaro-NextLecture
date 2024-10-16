import { PropsWithChildren } from 'react';

export default function EditRecipeLayout({ children }: PropsWithChildren) {
  return (
    <div className='border border-gray-400 flex flex-col w-2/5 items-center'>
      {children}
    </div>
  );
}
