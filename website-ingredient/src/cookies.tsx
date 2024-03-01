import jwt, { TokenExpiredError, JsonWebTokenError, NotBeforeError } from "jsonwebtoken-promisified";

const secretKey = "IngredientLens"; //required

export function checkToken(token:string | undefined) {
    try {
        // Verify and decode the token using the secret key
        if (token){
            const decoded = jwt.verify(token, secretKey);
            if (decoded && typeof decoded === 'object' && 'login' in decoded) {
                // At this point, TypeScript knows that decoded is a JwtPayload
                return decoded;
              } else {
                return null;
              }
        }
        else{
            return null;
        }
    } catch (error) {
        // Handle different types of errors explicitly
        if (error instanceof TokenExpiredError) {
            console.error('Token expired:', error.message);
        } else if (error instanceof JsonWebTokenError) {
            console.error('JWT error:', error.message);
        } else if (error instanceof NotBeforeError) {
            console.error('Not before error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        return null;
    }
}

export function createToken(userLogin:string){
    const token = jwt.sign({ login: userLogin }, secretKey, {
        expiresIn: "300m",
        algorithm: "HS256"
    });
    return token;
}