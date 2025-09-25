"use client";

import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { getMe } from "@/lib/api/clientApi";
import type { User } from "@/types/user";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getMe()
      .then((data) => setUser(data)) 
      .catch((error) => {
        if (error instanceof Error) {
          console.warn("Бэкенд недоступен:", error.message);
        } else {
          console.warn("Бэкенд недоступен, показана заглушка");
        }

        // Заглушка
        setUser({
          _id: "111",
          name: "Test User",
          email: "test@example.com",
          photoUrl: "https://via.placeholder.com/150",
          gender: "girl",
          dueDate: "2025-12-31",
        });
      });
  }, []);

  if (!user) return <p>Завантаження...</p>;

  return (
    <div>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}
  

