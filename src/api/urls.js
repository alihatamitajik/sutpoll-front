const BASE_URL = 'http://localhost:8000/api';

export const urls = {
    login: () => BASE_URL + '/auth/login',
    getPoll: (slug) => BASE_URL + `/poll/${slug}`,
    createPoll: () => BASE_URL + '/poll/create',
    allPolls: () => BASE_URL + '/poll/list',
    pollResults: (slug) => BASE_URL + `/poll/${slug}/results`,
    vote: () => BASE_URL + '/vote'
}
