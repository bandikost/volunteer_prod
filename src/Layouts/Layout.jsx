import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="flex flex-col">
      <Header  />
      <main className="flex-grow">
        <div className="w-full max-w-[990px] mx-auto px-4 mt-20">
          <Outlet />
        </div>
      </main> 
    </div>
  );
}
