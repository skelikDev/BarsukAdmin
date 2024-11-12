import styled from "styled-components";
import { useFormik } from "formik";
import { ChangeEvent, FC } from "react";
import { MaskedInput } from "../../../../../shared/ui/masked-input.tsx";
import { User } from "../../../../../api/type.ts";
import { api } from "../../../../../api";
import { Button } from "../../../../../shared/ui/button";

const extractNamePhone = (input: string) => {
  const phoneRegex = /\b\d+\b/;
  const nameRegex = /[^\d\s]+(?:\s+[^\d\s]+)*/;

  const phoneMatch = input.match(phoneRegex);
  const nameMatch = input.match(nameRegex);

  const phone = phoneMatch ? phoneMatch[0] : "";
  const name = nameMatch ? nameMatch[0].trim() : "";

  return { name, phone };
};

type UserSearchFormProps = {
  onSearch: (users: User[]) => void;
};

export const UserSearchForm: FC<UserSearchFormProps> = ({ onSearch }) => {
  const form = useFormik({
    initialValues: {
      searchQuery: "",
    },
    validate: (values) => {
      if (!values.searchQuery) {
        return { searchQuery: "Required" };
      } else if (values.searchQuery.length < 3) {
        return { searchQuery: "Too short" };
      }
    },
    onSubmit: async (values) => {
      const { name, phone } = extractNamePhone(values.searchQuery);
      const data = await api.user.searchUser({ name, phone });
      onSearch(data.items);
    },
  });

  const maskOptions = {
    mask: [
      {
        mask: "000[00000000] [aaaaaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa]",
        lazy: true,
        definitions: {
          "#": /[A-Za-z\s]/,
        },
      },
      {
        mask: "aaa[aaaaaaa] [aaaaaaaaaa] [aaaaaaaaaa] 000[00000000]",
        lazy: true,
        definitions: {
          "#": /[A-Za-z\s]/,
        },
      },
    ],
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("searchQuery", event.target.value);
  };

  return (
    <FormWrapper>
      <h4>Search</h4>
      <form onSubmit={form.handleSubmit}>
        <MaskedInput
          maskOptions={maskOptions}
          onChange={handleInputChange}
          value={form.values.searchQuery}
        />
        <Button disabled={!form.values.searchQuery} type="submit">
          Submit
        </Button>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div``;
