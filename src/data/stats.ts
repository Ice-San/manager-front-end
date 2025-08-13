import users from './users.json';

export default {
    totalUsers: users.length,
    admins: users.filter(user => user.role === "admin").length,
    moderators: users.filter(user => user.role === "moderator").length,
    users: users.filter(user => user.role === "user").length
}