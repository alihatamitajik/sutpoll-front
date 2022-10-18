// const BASE_URL = 'https://polls.taha7900.ir/api';
const BASE_URL = 'http://localhost:3500/api';

export const urls = {
    login: () => BASE_URL + '/auth/login',
    getPoll: (slug) => BASE_URL + `/poll/${slug}`,
    createPoll: () => BASE_URL + '/poll/create',
    allPolls: (page, size) => BASE_URL + `/poll/list?page=${page}&size=${size}`,
    pollResults: (slug) => BASE_URL + `/poll/${slug}/results`,
    vote: () => BASE_URL + '/vote',
    getDetails: (slug) => BASE_URL + `/poll/details/${slug}`
}

export const redirects = {
    poll_page: (slug) => `/polls/${slug}`,
    manage_poll: (slug) => `/admin/manage/${slug}`
}