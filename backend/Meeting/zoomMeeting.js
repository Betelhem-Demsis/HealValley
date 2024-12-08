// get the meeting
const zoomUtil = require("./zoomUtils");
// Zoom meeting class for creating and managing meetings.
class ZoomMeeting {
	constructor(meetingTopic, hostEmail, meetingDateTime, token) {
		this.meetingTopic = meetingTopic;
		this.hostEmail = hostEmail;
		this.meetingDateTime = meetingDateTime;
		this.token = token;

	}

	_jsonData() {
		// alternative host is not working and its very crucial for this site .
		// "alternative_hosts": this.hostEmail,
		const meetingData = {
			"topic": this.meetingTopic,
			"type": 2,
			"start_time": this.meetingDateTime,
			"duration": 60,
			"settings": {
				"alternative_hosts_email_notification": true
			}
		}

		return meetingData;

	}
	async createMeeting() {
		const {
			uuid,
			id,
			start_url,
			join_url,
			password
		} = await zoomUtil.createZoomMeeting(this._jsonData(), this.token);
		const data = {
			uuid,
			id,
			start_url,
			join_url,
			password
		};

		return data;
	}
}

module.exports = ZoomMeeting;
