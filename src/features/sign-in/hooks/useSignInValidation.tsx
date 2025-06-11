import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchemType, signInSchem} from "@/features/sign-in/schems/signInSchem";


export function useSignInValidation() {
    const {handleSubmit, control, setValue, getValues, reset, formState} = useForm<signInSchemType>({
        resolver: zodResolver(signInSchem),
        defaultValues: {
            user: "",
            password: "",
        },
    })

    return {
        handleSubmit,
        control,
        setValue,
        getValues,
        reset,
        formState,
    }
}
