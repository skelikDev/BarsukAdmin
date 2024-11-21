import { useFormik } from "formik";
import styled from "styled-components";
import { api } from "../../api";
import { notify } from "../../shared/ui/notify";
import { theme } from "../../app/theme";
import { MaskedInput } from "../../shared/ui/masked-input.tsx";
import { Button } from "../../shared/ui/button";
import { FC } from "react";
import { User } from "../../api/type.ts";

const removeExtraSpaces = (str: string | undefined) => {
  return str ? str.trimStart().replace(/\s+/g, " ") : "";
};

type UserRegistrationValues = {
  name: string;
  phone: string;
};

const initialValues: UserRegistrationValues = {
  name: "",
  phone: "",
};
type UserRegistrationProps = {
  onCreate?: (user: User) => void;
};
export const UserRegistration: FC<UserRegistrationProps> = ({ onCreate }) => {
  const form = useFormik({
    initialValues,
    onSubmit: async (values: UserRegistrationValues) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const phone = values.phone.match(/\d+/g).join("");
      const user = await api.user.createUser({ name: values.name, phone });
      if (onCreate) {
        onCreate(user);
      }
      notify("success", "Пользователь успешно создан");
      form.resetForm();
    },
    validate: (values: UserRegistrationValues) => {
      const errors: Partial<UserRegistrationValues> = {};
      if (!values.name) {
        errors.name = "Required";
      } else {
        const noWhiteSpace = values.name.replace(/\s/g, "");
        if (noWhiteSpace.length < 3) {
          errors.name = "Name is too short";
        } else if (noWhiteSpace.length > 45) {
          errors.name = "Name is too long";
        }
      }
      if (!values.phone) {
        errors.phone = "Required";
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const phone = values.phone.match(/\d+/g).join("");
        if (phone.length < 11) {
          errors.phone = "Phone is too short";
        } else if (phone.length > 11) {
          errors.phone = "Phone is too long";
        }
      }
      return errors;
    },
  });
  return (
    <Wrapper>
      <h4>Registration</h4>
      <form onSubmit={form.handleSubmit} className={"form"}>
        <div className={"user-data-inputs"}>
          <MaskedInput
            label={"Name"}
            placeholder={"Name"}
            name={"name"}
            maskOptions={{
              mask: "[aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa] [aaaaaaaaaaaaaaa]",
            }}
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue("name", removeExtraSpaces(event.target.value));
            }}
            error={form.errors.name}
          />
          <MaskedInput
            label={"Phone"}
            name={"phone"}
            placeholder={"Phone 1234"}
            maskOptions={{
              mask: "+7(000)000-00-00",
            }}
            value={form.values.phone}
            onChange={(event) => {
              form.setFieldValue("phone", event.target.value);
            }}
            error={form.errors.phone}
          />
        </div>
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid ${theme.colors.border.main};
  padding: ${theme.dimensions.spacing["7"]};
  width: 100%;
  height: fit-content;
  border-radius: ${theme.dimensions.borderRadius.default};
  display: flex;
  flex-direction: column;
  gap: ${theme.dimensions.spacing["6"]};
  align-items: center;

  & .form {
    width: 100%;
    height: 100%;
    gap: ${theme.dimensions.spacing["4"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .user-data-inputs {
      display: flex;
      gap: ${theme.dimensions.spacing["4"]};
      flex-direction: row;
      width: 100%;
    }
  }
`;
