import { FC } from 'react';
import { User } from '../../../../api/type.ts';
import styled from '@emotion/styled';

type UserListProps = {
    selectedUser: User | null;
    users: User[];
    onUserSelect: (user: User) => void;
}

export const UserList: FC<UserListProps> = ({users, onUserSelect}) => {
    const handleUserClick = (user: User) => {
        onUserSelect(user);
    }
    return <Wrapper>
        {users.map((user) => {
            return <span onClick={() => {
                handleUserClick(user)
            }}>
            {user.name}, {user.phone}
            </span>
        })}

    </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`