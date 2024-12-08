const axios = require('axios');

// Zoom API endpoint for creating a meeting
const ZOOM_MEETING_CREATE_ENDPOINT = `https://api.zoom.us/v2/users/me/meetings`;

/**
 * Create a Zoom meeting.
 *
 * @param {Object} meetingData - Meeting data object containing meeting details.
 * @returns {Object} - Response data from the Zoom API.
 */
exports.createZoomMeeting = async (meetingData, token) => {
	try {
		const response = await axios.post(ZOOM_MEETING_CREATE_ENDPOINT, meetingData, {
			headers: {
				'Authorization': `Bearer ${
					token
				}`, // Call a function to get the Zoom access token
				'Content-Type': 'application/json'
			}
		});

		return response.data;
	} catch (error) {
		console.error('Error creating Zoom meeting:', error ?. response ?. data || error.message);
		throw error;
	}
};


// Custom function to create a query string from an object
const createQueryString = (params) => {
	return Object.entries(params).map(([key, value]) => `${
		encodeURIComponent(key)
	}=${
		encodeURIComponent(value)
	}`).join('&');
};


const ZOOM_OAUTH_ENDPOINT = 'https://zoom.us/oauth/token';

/**
 * Call Zoom Oauth API for Server-to-Server access token.
 *
 * @param      {Object}  input_config
 * @param      {String}  input_config.ZOOM_ACCOUNT_ID     ati7AIt3R8Cj3K75O7YSdw
 * @param      {String}  input_config.ZOOM_CLIENT_ID     DWC9XtKxTbu8otT4R2SXLw
 * @param      {String}  input_config.ZOOM_CLIENT_SECRET   AyirBH0Gmh9avgGYDudpDUVj6QhH6WhJ
 * @returns    {String}  zoom access_token
 */
exports.getToken = async (ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET) => {
	try {
		const request = await axios.post(ZOOM_OAUTH_ENDPOINT, createQueryString({grant_type: 'account_credentials', account_id: ZOOM_ACCOUNT_ID}), {
			headers: {
				'Authorization': `Basic ${
					Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64')
				}`
			}
		});

		const response = await request.data;
		console.log(response.status)
		return response;
	} catch (e) {
		console.error(e ?. message, e ?. response ?. data);
	}
};
