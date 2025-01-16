import { Form, Link, NavLink, Outlet, useNavigation } from "react-router";
import { getContacts } from "../data";
import type { Route } from "../layouts/+types/sidebar";



export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search-query");
    const contacts = await getContacts(searchQuery);
    return { contacts };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {

    const { contacts } = loaderData
    const navigation = useNavigation();
    return (
        <>
            <div id="sidebar">
                <h1>
                    <Link to="about">React Router Contacts</Link>
                </h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            aria-label="Search contacts"
                            id="search-query"
                            name="search-query"
                            placeholder="Search"
                            type="search"
                        />
                        <div
                            aria-hidden
                            hidden={true}
                            id="search-spinner"
                        />
                    </Form>
                    {/* create a contact */}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts?.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}
                                        to={`contacts/${contact?.id}`}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}
                                        {contact.favorite ? (
                                            <span>★</span>
                                        ) : null}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div className={navigation.state === "loading" ? "loading" : ""} id="detail">
                <Outlet />
            </div>
        </>
    );
}