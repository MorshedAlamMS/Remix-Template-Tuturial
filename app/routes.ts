import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// setting up a route module
export default [
    layout("layouts/sidebar.tsx", [
        index("routes/home.tsx"),
        route("contacts/:contactId", "routes/contact.tsx"),
        route("contacts/:contactId/edit", "routes/contact-edit.tsx"),
        route("contacts/:contactId/destroy", "routes/contact-destroy.tsx"),
    ]),

    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
