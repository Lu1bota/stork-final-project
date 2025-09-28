"use client";

import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import Loader from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";
import AppLayout from "@/components/AppLayout/AppLayout";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Loader />;

  return (
    <AppLayout>
      <div>
        <ProfileAvatar />
        <ProfileEditForm user={user} />
      </div>
    </AppLayout>
  );
}
