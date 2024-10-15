import { PropsWithChildren } from 'react';

export default function addRecipeLayout({ children }: PropsWithChildren) {
  return <div className='w-2/3 mt-5 p-3'>{children}</div>;
}
