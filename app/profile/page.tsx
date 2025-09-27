"use client";

import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import Loader from "@/components/Loader/Loader";
import { useAuthStore } from "@/lib/store/authStore";

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);

  if (!user) return <Loader />;
  
  return (
    <div>
      <ProfileAvatar />
      <ProfileEditForm user={user} />
    </div>
  );
}