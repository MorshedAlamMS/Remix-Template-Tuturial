import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

// setting up a route module
export default [
    layout("layouts/sidebar.tsx", [
        index("routes/home.tsx"),
        route("contacts/:contactId", "routes/contact.tsx"),
    ]),

    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
