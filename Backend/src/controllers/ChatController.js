import Chat from "../Models/ChatModel.js";
import User from "../Models/User.js";

const accessChat = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId not send in request params");
        return res.sendStatus(400);
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user.id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email",
    });

    if (isChat.length > 0) {
       return res.status(200).json(isChat[0]);
    } else {
        var chatData = {
            isGroupChat: false,
            chatName: "sender",
            users: [req.user.id, userId],
        };
    }

    try {
        const createChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
            "users",
            "-password"
        );
       return res.status(200).json(fullChat);
    } catch (error) {
        return res.sendStatus(400);
       
    }
};
const fetchChat = async (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "latestMessage.sender",
                    select: "name email",
                })
                res.status(200).send(result);
            })

    } catch (error) {
        res.sendStatus(400);
        throw new Error(error.message);
    }

};
const createGroupChat = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).json({ message: "All fields are required" })
    }
    let users = JSON.parse(req.body.users)

    if (users.length < 2) {
        return res.status(400).send({ message: "more the 2 people are required to form the GroupChat" })
    }

    users.push(req.users)
    try {
        const groupChat = await Chat.create({
            chatName: req.body.users,
            isGroupChat: true,
            users: users,
            groupAdmin: req.users
        })
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        res.status(200).json(fullGroupChat)
    } catch (error) {
        res.sendStatus(400);
        throw new Error(error.message);
    }


}
const RenameGroup = async (req, res) => {
    const { chatId, chatName } = req.body
    const updateChat = await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!updateChat) {
        res.status(404)
        throw new Error("Chat not Found")
    } else {
        res.json(updateChat)
    }

}
const addMember = async (req, res) => {
    const { chatId, userId } = req.body

    const added = await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!added) {
        res.status(404)
        throw new Error("Chat not Found")
    } else {
        res.json(added)
    }
}
const deleteMember = async (req, res) => {
    const { chatId, userId } = req.body

    const remove = await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    if (!remove) {
        res.status(404)
        throw new Error("Chat not Found")
    } else {
        res.json(remove)
    }
}

export { accessChat, fetchChat, createGroupChat, RenameGroup, addMember, deleteMember };
