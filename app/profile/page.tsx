"use client";

import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { getMe } from "@/lib/api/clientApi";


export default function ProfilePage() {
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        console.warn("Бэкенд недоступен, показана заглушка");
        setUser({
          id: 111,
          name: "Test User",
          email: "test@example.com",
          avatar: "https://via.placeholder.com/150",
          gender: "Жіноча",
          dueDate: "2025-12-31",
        });
      });
  }, []);

  if (!user) return <p>Завантаження...</p>;
  
  return (
    <div >
      
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}
  


  

  

