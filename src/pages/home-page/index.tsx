import { WithDrawer } from "../../shared/ui/layout/with-drawer";
import { UserRegistration } from "../../features/user-registration";
import { Loyalty } from "../../widgets/loyalty";
import { useState } from "react";
import { User } from "../../api/type.ts";
import { UserProfile } from "../../widgets/loyalty/ui/user-profile";

export const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log(selectedUser);
  return (
    <WithDrawer
      isOpenDrawer={isDrawerOpen}
      onCloseDrawer={() => {
        setIsDrawerOpen(false);
      }}
      onOpenDrawer={() => {
        setIsDrawerOpen(true);
      }}
      drawerContent={
        <>
          <UserRegistration
            onCreate={(user) => {
              setSelectedUser(user);
              setIsDrawerOpen(false);
            }}
          />
          <Loyalty
            setSelectedUser={(user) => {
              setSelectedUser(user);
              setIsDrawerOpen(false);
            }}
            selectedUser={selectedUser}
          />
        </>
      }
    >
      {selectedUser && <UserProfile id={selectedUser.id} />}
    </WithDrawer>
  );
};
