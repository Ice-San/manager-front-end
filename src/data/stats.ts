import users from './users.json';

export default {
    total_users: users.length,
    admins: users.filter(user => user.role === "admin").length,
    mods: users.filter(user => user.role === "moderator").length,
    users: users.filter(user => user.role === "user").length
}