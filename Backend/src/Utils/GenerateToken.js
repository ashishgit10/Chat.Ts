import jwt from "jsonwebtoken"
const SECRETE = "ashish122"
const generateToken = (id) => {
    return jwt.sign({ id }, SECRETE)
}

export default generateToken