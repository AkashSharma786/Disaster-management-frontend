
import { jwtDecode } from "jwt-decode";


export function parseAuthToken(token: string) {
    try {
        const decodedToken: any = jwtDecode(token);
        return {
            username: decodedToken.sub,
            role: decodedToken.role ,
            firstName: decodedToken.firstName
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

