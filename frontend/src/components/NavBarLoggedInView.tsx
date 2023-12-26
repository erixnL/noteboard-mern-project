import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NotesApi from "../network/notes_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogOutSuccessful: ()=> void
}

const NavBarLoggedInView = ({user, onLogOutSuccessful}: NavBarLoggedInViewProps) => {
    async function logout() {
        try {
            await NotesApi.logout();
            onLogOutSuccessful();

        } catch(error) {
            console.error(error);
        }
    }
    return ( 
        <>
        <Navbar.Text className="me-2">
            Signed in as: {user.username}
        </Navbar.Text>
        <Button onClick={logout}>Log out</Button>
        </>
     );
}
 
export default NavBarLoggedInView;