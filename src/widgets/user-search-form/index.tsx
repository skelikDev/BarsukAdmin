import { useFormik } from 'formik';

import { FC, useEffect, useState } from 'react';
import { usersApi } from '@/api';
import { UserResponseDto } from '@/api/types.ts';
import { useDebounce } from '@/shared/hooks/use-debounce.tsx';
import { InputCombobox } from '@/shared/ui/input-combobox.tsx';
import { useNavigate } from 'react-router-dom';

const extractNamePhone = (input: string) => {
  const phoneRegex = /\b\d+\b/;
  const nameRegex = /[^\d\s]+(?:\s+[^\d\s]+)*/;

  const phoneMatch = input.match(phoneRegex);
  const nameMatch = input.match(nameRegex);

  const phone = phoneMatch ? phoneMatch[0] : '';
  const name = nameMatch ? nameMatch[0].trim() : '';

  return { name, phone };
};

type TUserSearchFormProps = {
  className?: string;
};

export const UserSearchForm: FC<TUserSearchFormProps> = ({ className }) => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      searchQuery: '',
    },
    validate: (values) => {
      if (values.searchQuery && values.searchQuery.length < 3) {
        return { searchQuery: 'Too short' };
      }
    },
    onSubmit: async (values) => {
      const { name, phone } = extractNamePhone(values.searchQuery);
      const onlySymbols = values.searchQuery.replace(/\s/g, '');
      if (onlySymbols === '') {
        return;
      }
      setLoading(true);
      const { data } = await usersApi.getAllUsers({ name, phone });
      setLoading(false);
      setUsers(data.items);
    },
  });

  const maskOptions = {
    mask: [
      {
        mask: '000[00000000] [aaaaaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa]',
        lazy: true,
        definitions: {
          '#': /[A-Za-z\s]/,
        },
      },
      {
        mask: 'aaa[aaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa] 000[00000000]',
        lazy: true,
        definitions: {
          '#': /[A-Za-z\s]/,
        },
      },
    ],
  };

  const [debouncedSearchQuery] = useDebounce(form.values.searchQuery, 800);

  useEffect(() => {
    form.handleSubmit();
  }, [debouncedSearchQuery]);

  const handleInputChange = (value: string) => {
    form.setFieldValue('searchQuery', value);
  };

  const handleRedirect = (id: string) => {
    navigate(`/cashier/${id}`);
  };

  return (
    <InputCombobox
      className={className}
      isLoading={loading}
      inputProps={{
        maskOptions: maskOptions,
        placeholder: 'Поиск',
        onValueChange: handleInputChange,
        value: form.values.searchQuery,
        extraText: form.errors.searchQuery,
        extraTextPosition: 'icon',
        status: form.errors.searchQuery ? 'error' : 'default',
      }}
      onSelect={(id) => {
        handleRedirect(id);
      }}
      items={users.map((user) => ({
        id: user.id,
        el: (
          <div>
            {user.name} {user.phone}
          </div>
        ),
      }))}
    />
  );
};
