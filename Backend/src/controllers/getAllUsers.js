

//api/v1/?search=Ashish

import User from "../Models/User.js"

const getAllUsers = async (req, res) => {
    const keyword = req.query ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}
    const users = await User.find(keyword).select('-password').find({ _id: { $ne: req.user.id } })

    res.status(200).json({ data: users })
}

export default getAllUsers