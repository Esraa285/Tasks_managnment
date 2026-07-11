// 'use client';

// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import Cookies from 'js-cookie';
// import { UserContextType, UserInterface } from '@/Interfaces/AuthInterfaces'; 



// const UserContext = createContext<UserContextType | null>(null);

// export default function  UserContextProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<UserInterface | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {

//     const token = Cookies.get('user-token');
    
//     if (token) {
//       // 2. لو التوكن موجود، هاتي بيانات اليوزر بالطريقة اللي متعودة عليها في مشروعك
//       // مثلاً لو عندك دالة جاهزة بتجيب اليوزر، اندهيها هنا واعملي setUser لقيمتها
//     }
    
//     setLoading(false);
//   }, []);

//   const logout = () => {
//     Cookies.remove('user-token');
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, loading, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   const context = useContext(UserContext);
//   if (!context) throw new Error('useUser must be used within a UserProvider');
//   return context;
// }