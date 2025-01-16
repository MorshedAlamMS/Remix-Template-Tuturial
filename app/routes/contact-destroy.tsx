import { redirect } from "react-router"
import { deleteContact } from "../data"
import type { Route } from "./+types/contact-destroy"


export const action = async ({ params }: Route.ActionArgs) => {
    await deleteContact(params.contactId)
    return redirect("/")
}