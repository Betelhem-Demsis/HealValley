const {getToken} = require("./zoomUtils");
const config = require("../Config/Keys");
exports.generateAccessToken = async (req, res, next) => {
	try {
		const ZOOM_ACCOUNT_ID = config.zoomAccountId;
		const ZOOM_CLIENT_ID = config.zoomClientId;
		const ZOOM_CLIENT_SECRET = config.zoomClientSecret;

		console.log(ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET);
		const access_token = await getToken(ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET);
		res.locals.token = access_token;
		next()
	} catch (err) {
		console.log(err);
		next()
	}
}
