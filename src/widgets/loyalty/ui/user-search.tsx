import styled from '@emotion/styled';
import { useFormik } from 'formik';
import { api } from '../../../api';
import { ChangeEvent, FC } from 'react';
import { User } from '../../../api/type.ts';
import { MaskedInput } from '../../../shared/ui/masked-input.tsx';

const extractNamePhone = (input: string) => {
    const phoneRegex = /\b\d+\b/;
    const nameRegex = /[^\d\s]+(?:\s+[^\d\s]+)*/;

    const phoneMatch = input.match(phoneRegex);
    const nameMatch = input.match(nameRegex);

    const phone = phoneMatch ? phoneMatch[0] : '';
    const name = nameMatch ? nameMatch[0].trim() : '';

    return {name, phone};
};

type UserSearchProps = {
    onSearch: (users: User[]) => void
}

export const UserSearch: FC<UserSearchProps> = ({onSearch}) => {
    const form = useFormik({
        initialValues: {
            searchQuery: '',
        },
        onSubmit: async (values) => {
            const {name, phone} = extractNamePhone(values.searchQuery);

            const data = await api.user.searchUser({name, phone})
            onSearch(data.items)
        }
    })

    const maskOptions = {
        mask: [
            {
                mask: '000[00000000] [aaaaaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa]',
                lazy: true,
                definitions: {
                    '#': /[A-Za-z\s]/
                }
            },
            {
                mask: 'aaa[aaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa] 000[00000000]',
                lazy: true,
                definitions: {
                    '#': /[A-Za-z\s]/
                }
            }
        ]
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        form.setFieldValue('searchQuery', event.target.value);
    }

    return (
        <FormWrapper>
            <form onSubmit={form.handleSubmit}>
                <MaskedInput
                    maskOptions={maskOptions}
                    onChange={handleInputChange}
                    value={form.values.searchQuery}
                />
                <button type="submit">Submit</button>
            </form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`

`
