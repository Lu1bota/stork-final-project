// app/profile/page.tsx
"use client";

import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Мій профіль</h1>

      {user ? (
        <div>
          <p>
            <strong>Ім’я:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <a href="/profile/edit" style={{ color: "blue" }}>
            Редагувати профіль
          </a>
        </div>
      ) : (
        <p>Користувач не увійшов у систему</p>
      )}
    </main>
  );
}
