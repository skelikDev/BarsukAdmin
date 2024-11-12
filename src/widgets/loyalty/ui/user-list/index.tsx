import { FC } from "react";
import styled from "styled-components";
import { User } from "../../../../api/type.ts";
import { theme } from "../../../../app/theme";

type UserListProps = {
  selectedUser: User | null;
  users: User[];
  onUserSelect: (user: User) => void;
};
type ItemProps = { $isSelected?: boolean };

const Item = styled.span<ItemProps>`
  color: ${({ $isSelected }) =>
    $isSelected ? theme.colors.interactive.main : theme.colors.text.ghost};
  cursor: pointer;

  &:hover {
    color: ${({ $isSelected }) =>
      $isSelected
        ? theme.colors.interactive.active
        : theme.colors.interactive.hover};
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid ${theme.colors.border.main};
  border-radius: ${theme.dimensions.borderRadius.default};
`;

export const UserList: FC<UserListProps> = ({
  users,
  onUserSelect,
  selectedUser,
}) => {
  const handleUserClick = (user: User) => {
    onUserSelect(user);
  };
  const capitalizeName = (name?: string) => {
    if (!name) {
      return name;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const formatedPhone = (phone?: string) => {
    if (!phone) {
      return phone;
    }
    return `+${phone.slice(0, 1)}(${phone.slice(1, 4)})${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
  };
  return (
    <Wrapper>
      {users.map((user) => {
        return (
          <Item
            $isSelected={selectedUser?.id === user.id}
            onClick={() => {
              handleUserClick(user);
            }}
          >
            {capitalizeName(user.name)}: {formatedPhone(user.phone)}
          </Item>
        );
      })}
    </Wrapper>
  );
};
