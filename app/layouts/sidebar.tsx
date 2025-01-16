import { Form, Link, NavLink, Outlet, useNavigation, useSubmit } from "react-router";
import { getContacts } from "../data";
import type { Route } from "../layouts/+types/sidebar";
import { useEffect } from "react";



export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search-query");
    const contacts = await getContacts(searchQuery);
    return { contacts, searchQuery };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {

    const { contacts, searchQuery } = loaderData
    const navigation = useNavigation();
    const searchFormSubmit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("search-query");

    // back button click korle ager search form er value clear hobe
    useEffect(() => {
        const searchField = document.getElementById("search-query") as HTMLInputElement;
        if (searchField) {
            searchField.value = searchQuery ?? "";
        }
    }, [searchQuery]);
    return (
        <>
            <div id="sidebar">
                <h1>
                    <Link to="about">React Router Contacts</Link>
                </h1>
                <div>
                    <Form id="search-form" role="search"
                        onChange={(event) => {
                            const isFirstSearch = searchQuery === null;
                            searchFormSubmit(event.currentTarget, { replace: !isFirstSearch });
                        }}>
                        <input
                            aria-label="Search contacts"
                            className={searching ? "loading" : ""}
                            defaultValue={searchQuery ?? ""}
                            id="search-query"
                            name="search-query"
                            placeholder="Search"
                            type="search"

                        />
                        <div
                            aria-hidden
                            hidden={!searching}
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