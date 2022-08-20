export const host = "http://localhost:5000/";
// export const host = "https://ping-it-chat.herokuapp.com/";
export const registerRoute = host + "api/auth/register";
export const loginRoute = host + "api/auth/login";

export const setAvatarRoute = host + "api/profile/setAvatar";
export const allContactsRoute = host + "api/profile/allContacts";
export const getUsersRoute = host + "api/profile/getUsers";
export const addContactRoute = host + "api/profile/addContact";

export const getConversations = host + "api/chat/getConvos";
export const checkisContact = host + "api/chat/isContact";
export const getMessagesPath = host + "api/chat/getConvo";
export const sendMessagePath = host + "api/chat/sendMessage";
