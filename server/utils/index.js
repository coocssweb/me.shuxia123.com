export const getDeviceAgent = (req) => {
    const deviceAgent = req.headers['user-agent'].toLowerCase();
    const agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        return 'MOBILE';
    } else {
        return 'PC';
    }
};
