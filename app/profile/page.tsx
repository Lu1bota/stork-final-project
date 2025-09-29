import ProfileAvatar from "@/components/profile/ProfileAvatar/ProfileAvatar";
import ProfileEditForm from "@/components/profile/ProfileEditForm/ProfileEditForm";
import AppLayout from "@/components/AppLayout/AppLayout";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div>
        <ProfileAvatar />
        <ProfileEditForm />
      </div>
    </AppLayout>
  );
}
