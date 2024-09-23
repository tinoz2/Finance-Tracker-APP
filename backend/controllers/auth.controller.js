import generateToken from '../lib/jwt.js';
import User from '../schemas/user.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Name or email is already taken." });
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, email, password: passwordHash, })

        generateToken(newUser, res)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error to create your account" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({ email })
        const passwordMatch = await bcrypt.compare(password, userFound.password)

        if (!userFound || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        generateToken(userFound, res)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error in log in" })
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.json({ message: "Sesión cerrada correctamente" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al cerrar sesión" })
    }
}

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")

        if (!user) return res.status(401).json({ message: "Usuario no encontrado" })

        res.status(200).json({ success: true, user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Hubo un error al encontrar el perfil" })
    }
}

export {
    register,
    login,
    logout,
    profile
}