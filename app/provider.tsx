"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../context/UserDetailContext';
import { OnSaveContext } from '../context/OnSaveContext';


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>()
  const [onSaveData, setOnSaveData] = useState<any>(null)

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const CreateNewUser = async () => {
      try {
        const payload = {
          userId: user.id,
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
        };

        const result = await axios.post('/api/users', payload, { withCredentials: true });
        console.log('User API result:', result.data);
        setUserDetail(result.data?.user)
      } catch (err) {
        console.error('CreateNewUser error:', err);
      }
    };

    CreateNewUser();
  }, [user]);



  return (
    <div>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <OnSaveContext.Provider value={{ onSaveData, setOnSaveData }}>
          {children}
        </OnSaveContext.Provider>
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider

