const uuidv4 = require('uuid/v4')

//create user will have to change to be logged in user 

const createUser = ({ name='' } = {}) => (
    {
        id:uuidv4(),
        name
    }
)

//create message
const createMessage = ({ message='', sender=''} = { }) => (
    {
        id:uuidv4(),
        time:getTime(new Date(Date.now())),
        message,
        sender
    }
)

//createChat

const createChat = ({messages= [], name='Community', users:[]} = {})=>(
    {
        id:uuidv4(),
        name,
        messages,
        typingUsers: []
    }
)


//return date
const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes().slice(-2))}`
}

module.exports = {
    createUser,
    createMessage,
    createChat
}