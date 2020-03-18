const users = [];

const addUser = ({ id, room, name }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check if the same user exist
    const existingUser = users.find(user => user.room === room && user.name === name);

    if (existingUser) {
        return { error: 'Sorry, this name is already taken' };
    }

    const user = { id, name, room };

    users.push(user);

    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);

    //if user not found
    if (index === -1) {
        return { error: 'No such user exists' };
    }

    return users.splice(index, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getAllUsersOfRoom = room => users.filter(user => user.room === room);

module.exports = {
    addUser,
    removeUser,
    getUser,
    getAllUsersOfRoom
};