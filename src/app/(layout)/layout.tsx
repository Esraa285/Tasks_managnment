import NavBar from '@/components/NavBar/NavBar';
import SideBare from '@/components/SideBar/SideBare';
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" ">
          <div className="container mx-auto">
             
                  {children}
            
          </div>
          </div>
  
  );
}
