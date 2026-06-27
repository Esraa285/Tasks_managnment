'use client'
import NavProject from '@/components/nav/nav';
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

export default function Project() {

     const pathname = usePathname();
       const params = useParams();
       const projectId = params?.projectId as string;


  return (
 <NavProject projectName={projectId?.name}/>
  )
}
