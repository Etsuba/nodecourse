const usersDB = {
    users: require('../model/users.json'),//like use state in react
    setUsers: function (data){
        this.users = data
    }

}