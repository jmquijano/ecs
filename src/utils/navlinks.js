import { PageBaseUrl } from "./urlbase";

const NavLinks = [
    {
        title: 'Dashboard',
        path: PageBaseUrl.Dashboard 
    },
    {
        title: 'My Application',
        path: PageBaseUrl.Application,
        beginWith: true
    }
];

export { NavLinks };