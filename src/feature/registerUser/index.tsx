import { useCreateUser } from '@/api/users';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card.tsx';
import { FormInput } from '@/shared/ui/form-input';
import { useFormik } from 'formik';
import { CreateUserDto, CreateUserResponseDto } from '@/api/types.ts';
import { Button } from '@/shadcn/components/ui/button.tsx';
import { FC } from 'react';

const removeExtraSpaces = (str: string | undefined) => {
  return str ? str.trimStart().replace(/\s+/g, ' ') : '';
};

const initialValues: CreateUserDto = {
  name: '',
  phone: '',
};

type TRegisterUserProps = {
  onCreate?: (user: CreateUserResponseDto) => void;
};

export const RegisterUser: FC<TRegisterUserProps> = ({ onCreate }) => {
  const { createUser, loading } = useCreateUser();

  const form = useFormik({
    initialValues,
    onSubmit: async (values: CreateUserDto) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const phone = values.phone.match(/\d+/g).join('');
      const user = await createUser({ name: values.name, phone });
      if (onCreate && user) {
        onCreate(user);
      }
      form.resetForm();
    },
    validate: (values: CreateUserDto) => {
      const errors: Partial<CreateUserDto> = {};
      if (!values.name) {
        errors.name = 'Required';
      } else {
        const noWhiteSpace = values.name.replace(/\s/g, '');
        if (noWhiteSpace.length < 3) {
          errors.name = 'Name is too short';
        } else if (noWhiteSpace.length > 45) {
          errors.name = 'Name is too long';
        }
      }
      if (!values.phone) {
        errors.phone = 'Required';
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const phone = values.phone.match(/\d+/g).join('');
        if (phone.length < 11) {
          errors.phone = 'Phone is too short';
        } else if (phone.length > 11) {
          errors.phone = 'Phone is too long';
        }
      }
      return errors;
    },
  });

  return (
    <Card className="w-[450px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <CardHeader>
          <CardTitle>Register user</CardTitle>
        </CardHeader>
        <CardContent>
          <FormInput
            label={'Name'}
            placeholder={'Name'}
            name={'name'}
            value={form.values.name}
            maskOptions={{
              mask: '[aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa]',
            }}
            onChange={(event) => {
              form.setFieldValue('name', removeExtraSpaces(event.target.value));
            }}
            extraText={form.errors.name}
          />
          <FormInput
            label={'Phone'}
            name={'phone'}
            maskOptions={{
              mask: '+7(000)000-00-00',
            }}
            placeholder={'Phone 1234'}
            value={form.values.phone}
            onChange={(event) => {
              form.setFieldValue('phone', event.target.value);
            }}
            extraText={form.errors.phone}
          />
        </CardContent>
        <CardFooter>
          <Button type={'submit'} disabled={loading}>
            Register
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

// name={"name"}
// maskOptions={{
//     mask: "[aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa]",
// }}
// name={"phone"}
// maskOptions={{
//     mask: "+7(000)000-00-00",
// }}

//
// const removeExtraSpaces = (str: string | undefined) => {
//     return str ? str.trimStart().replace(/\s+/g, " ") : "";
// };
//
// type  CreateUserDto = {
//     name: string;
//     phone: string;
// };
//
// const initialValues:  CreateUserDto = {
//     name: "",
//     phone: "",
// };
// type UserRegistrationProps = {
//     onCreate?: (user: User) => void;
// };

//const form = useFormik({
//     initialValues,
//     onSubmit: async (values:  CreateUserDto) => {
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       const phone = values.phone.match(/\d+/g).join("");
//       const user = await api.user.createUser({ name: values.name, phone });
//       if (onCreate) {
//         onCreate(user);
//       }
//       notify("success", "Пользователь успешно создан");
//       form.resetForm();
//     },
//     validate: (values:  CreateUserDto) => {
//       const errors: Partial< CreateUserDto> = {};
//       if (!values.name) {
//         errors.name = "Required";
//       } else {
//         const noWhiteSpace = values.name.replace(/\s/g, "");
//         if (noWhiteSpace.length < 3) {
//           errors.name = "Name is too short";
//         } else if (noWhiteSpace.length > 45) {
//           errors.name = "Name is too long";
//         }
//       }
//       if (!values.phone) {
//         errors.phone = "Required";
//       } else {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         const phone = values.phone.match(/\d+/g).join("");
//         if (phone.length < 11) {
//           errors.phone = "Phone is too short";
//         } else if (phone.length > 11) {
//           errors.phone = "Phone is too long";
//         }
//       }
//       return errors;
//     },
//   });

//  <form onSubmit={form.handleSubmit} className={"form"}>
//         <div className={"user-data-inputs"}>
//           <MaskedInput
//             label={"Name"}
//             placeholder={"Name"}
//             name={"name"}
//             maskOptions={{
//               mask: "[aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa]",
//             }}
//             value={form.values.name}
//             onChange={(event) => {
//               form.setFieldValue("name", removeExtraSpaces(event.target.value));
//             }}
//             error={form.errors.name}
//           />
//           <MaskedInput
//             label={"Phone"}
//             name={"phone"}
//             placeholder={"Phone 1234"}
//             maskOptions={{
//               mask: "+7(000)000-00-00",
//             }}
//             value={form.values.phone}
//             onChange={(event) => {
//               form.setFieldValue("phone", event.target.value);
//             }}
//             error={form.errors.phone}
//           />
//         </div>
//         <Button type="submit" fullWidth>
//           Submit
//         </Button>
//       </form>
