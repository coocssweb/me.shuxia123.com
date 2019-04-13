import { getDeviceAgent } from './index';
export default (request, list) => {
    const DESCRIPTION_LENGTH = getDeviceAgent(request) === 'MOBILE' ? 25 : 50;
    list.map((article) => {
        article.description = article.description.length > DESCRIPTION_LENGTH ? article.description.substring(0, DESCRIPTION_LENGTH) : article.description;
    });
};
