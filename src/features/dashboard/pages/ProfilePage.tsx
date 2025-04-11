import ProfileForm from '@features/dashboard/components/ProfileForm'
import PasswordForm from '@features/dashboard/components/PasswordForm'

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen items-center flex-wrap">
      <div className="w-full py-8 md:px-6">
        <div className="mx-auto grid w-full gap-8 px-2 xl:w-6/12">
          <ProfileForm />
          <PasswordForm/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
