import { FormInput } from '@/shared/ui/form-input';
import { useFormik } from 'formik';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import { ScrollArea } from '@/shadcn/components/ui/scroll-area.tsx';
import { usersApi } from '@/api';
import { UserResponseDto } from '@/api/types.ts';
import { useDebounce } from '@/shared/hooks/use-debounce.tsx';
import { Separator } from '@/shadcn/components/ui/separator.tsx';

const extractNamePhone = (input: string) => {
  const phoneRegex = /\b\d+\b/;
  const nameRegex = /[^\d\s]+(?:\s+[^\d\s]+)*/;

  const phoneMatch = input.match(phoneRegex);
  const nameMatch = input.match(nameRegex);

  const phone = phoneMatch ? phoneMatch[0] : '';
  const name = nameMatch ? nameMatch[0].trim() : '';

  return { name, phone };
};

export const UserSearchForm = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const form = useFormik({
    initialValues: {
      searchQuery: '',
    },
    validate: (values) => {
      if (!values.searchQuery) {
        return { searchQuery: 'Required' };
      } else if (values.searchQuery.length < 3) {
        return { searchQuery: 'Too short' };
      }
    },
    onSubmit: async (values) => {
      const { name, phone } = extractNamePhone(values.searchQuery);

      const { data } = await usersApi.getAllUsers({ name, phone });
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('searchQuery', event.target.value);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Поиск</CardTitle>
          <CardDescription>
            Поиск по имени и номеру телефона зарегестрированных пользователей
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormInput
            errorPosition={'top'}
            maskOptions={maskOptions}
            label={'Имя телефон'}
            error={form.errors.searchQuery}
            onChange={handleInputChange}
            value={form.values.searchQuery}
          />
        </CardContent>
        <CardFooter>
          <ScrollArea className="h-[200px] w-full py-4">
            <div className="absolute bottom-4 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />

            {[
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
              ...users,
            ].map((user) => {
              return (
                <div>
                  {user.name}
                  <Separator />
                </div>
              );
            })}
          </ScrollArea>
        </CardFooter>
      </Card>
    </>
  );
};
