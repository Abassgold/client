import { redirect } from "next/navigation"
import { SignUpActionState, signUpFormSchema } from "./schema"

export async function signUpAction(
  _prev: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {
  const form = Object.fromEntries(formData)
  const validationResult = signUpFormSchema.safeParse(form)

  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  // Process signup here (e.g., save to DB)

  redirect("/")
}