import styled from "styled-components";
import { FC, useState } from "react";
import { User } from "../../api/type.ts";
import { UserSearchForm } from "./ui/user-search/ui/search-form.tsx";
import { UserList } from "./ui/user-list";
import { theme } from "../../app/theme";

const ddd = [
  {
    id: 5,
    name: "test test",
    phone: "73333333333",
    points: 0,
    registrationHistories: [
      {
        id: 5,
        action: "REGISTRATION",
        date: "2024-11-12T07:30:27.760Z",
      },
    ],
  },
];

type LoyaltyProps = {
  setSelectedUser: (user: User) => void;
  selectedUser: User | null;
};

export const Loyalty: FC<LoyaltyProps> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };
  const handleSearch = (users: User[]) => {
    setUsers(users);
  };

  return (
    <Wrapper>
      <LayoutForUserSearch>
        <UserSearchForm onSearch={handleSearch} />
        {users && users.length === 0 ? (
          <div>Ничего не найдено</div>
        ) : (
          <UserList
            selectedUser={selectedUser}
            users={users}
            onUserSelect={handleUserSelect}
          />
        )}
      </LayoutForUserSearch>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LayoutForUserSearch = styled.div`
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.dimensions.borderRadius.default};
  padding: ${theme.dimensions.spacing["7"]};
  flex: 1;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;
