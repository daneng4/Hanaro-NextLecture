import { PropsWithChildren } from 'react';

export default function DetailRecipeLayout({ children }: PropsWithChildren) {
  return <div className='flex flex-col w-full items-center'>{children}</div>;
}
