"use client";

import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm";

// export default function ProfilePage() {
//     const [user, setUser] = useState(0);

//     useEffect(() => {
//      fetch ("http://localhost:3000/api/user/111")
//      .then ((res) => res.json())
//      .then ((data) => setUser(data))
//      .catch ((err) => console.error("Помилка завантаження:", err));
//     },[]);


//     const handleUpdate = async (updatedUser) => {
//     const res = await fetch("http://localhost:3000/api/user/111", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     });
//     const data = await res.json();
//     setUser(data);
//   };


//      if(!user) return <p>Завантаження...</p>

//     return (
//     <div className="profile-container">
//       <ProfileAvatar avatarUrl={user.avatarUrl} name={user.name} />
//       <ProfileEditForm user={user} onUpdate={handleUpdate} />
//     </div>
//   );
// }

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/111")
      .then((res) => {
        if (!res.ok) throw new Error("Сервер повернув помилку");
        return res.json();
      })
      .then((data) => setUser(data))
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
    <div style={{ maxWidth: "644px", marginLeft: "312px" }}>
      
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} />
    </div>
  );
}