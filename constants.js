export const GRAPH_API_URL = 'https://heytheremanwithoutawife.pythonanywhere.com/graphql/';
export const LOGIN_API_URL = 'https://heytheremanwithoutawife.pythonanywhere.com/token-auth/';
export const GET_THREADS_QUERY = `query getThreads { threads{ id title content slug threadAuthor{username} comments { id commentAuthor content}}}`;
export const REGISTER_API_URL = 'https://heytheremanwithoutawife.pythonanywhere.com/api/new_user/';
