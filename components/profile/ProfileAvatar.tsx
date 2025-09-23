import { useRef } from "react";
import styles from "./ProfileAvatar.module.css";

export default function ProfileAvatar({ user }: { user: any }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Вибраний новий аватар:", file.name);
      // тут потом будет запрос на бекенд
    }
  };

  return (
    <div className={styles.profileWrapper}>

         <nav className={styles.breadcrumbs}>
        {/* <Link to="/" className={styles.breadcrumbLink}>Лелека</Link> */}
        <span>Лелека</span>
        <span className={styles.breadcrumbSeparator}>{'>'}</span>
        <span className={styles.breadcrumbActive}>Профіль</span>
      </nav>

      {/* Profile content */}
      <div className={styles.avatarContainer}>

        <div className={styles.avatarWrapper}>
          <img
            src={user.avatar}
            
            className={styles.avatarImage}
          />
        </div>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{user.name}</h2>
          <p className={styles.userEmail}>{user.email}</p>
                  <button
            onClick={handleUploadClick}
            className={styles.uploadButton}
          >
            Завантажити нове фото
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}