import styled from '@emotion/styled';
import { UserSearch } from './ui/user-search.tsx';
import { UserList } from './ui/user-list';
import { useState } from 'react';
import { User } from '../../api/type.ts';


export const Loyalty = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    }

    const handleSearch = (users: User[]) => {
        setUsers(users);
    }

    return (
        <Wrapper>
            <LayoutForUserSearch>
                <UserSearch
                    onSearch={handleSearch}
                />
                <UserList
                    onUserSelect={handleUserSelect}
                    users={users}
                    selectedUser={selectedUser}
                />
            </LayoutForUserSearch>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LayoutForUserSearch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`