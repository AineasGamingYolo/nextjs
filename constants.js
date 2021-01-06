<<<<<<< HEAD
export const GRAPH_API_URL = 'http://localhost:4000/graphql/';
export const LOGIN_API_URL = 'http://localhost:4000/token-auth/';
export const REGISTER_API_URL = 'http://localhost:4000/api/new_user/'
export const GET_THREADS_QUERY = `query getThreads { threads{ id title content slug threadAuthor{username} comments { id commentAuthor content}}}`;
=======
export const GRAPH_API_URL = 'https://heytheremanwithoutawife.pythonanywhere.com/graphql/';
export const LOGIN_API_URL = 'https://heytheremanwithoutawife.pythonanywhere.com/token-auth/';
export const GET_THREADS_QUERY = `query getThreads { threads{ id title content slug threadAuthor{username} comments { id commentAuthor content}}}`;
>>>>>>> b2cd277ee4bee5a27afc90cd56b59199b814eff5
