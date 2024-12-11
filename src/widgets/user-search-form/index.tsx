import { useFormik } from 'formik';
import { Input, InputD } from '@/shadcn/components/ui/input.tsx';

export const UserSearchForm = () => {
    // const form = useFormik()

    return (
        <form>
            <Input id={'sasa'} label={'dssdsd'}/>
            <InputD label={'dssdsd'} error={'dasdas'}/>
        </form>
    )
}