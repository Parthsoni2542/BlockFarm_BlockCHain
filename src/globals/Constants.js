const BASE_URL = "https://hopeaccelerated-backend.herokuapp.com";

const endpoints = {
	BASE_URL,
	PROFILE: BASE_URL + "/api/v1/auth/me",
	UPLOAD_KYC: BASE_URL + "/api/v1/attachment/upload/kyc",
	GET_WALLET: BASE_URL + "/api/v1/user/wallet",
	CREATE_SEEDPHRASE: BASE_URL + "/api/v1/user/wallet/seedphrase/create",
	UPDATE_SEEDPHRASE: BASE_URL + "/api/v1/user/wallet/seedphrase/update",
	VALIDATE_SEEDPHRASE: BASE_URL + "/api/v1/user/wallet/seedphrase/validate",
	CREATE_PINCODE: BASE_URL + "/api/v1/user/wallet/pincode/create",
	UPDATE_PINCODE: BASE_URL + "/api/v1/user/wallet/pincode/update",
	VALIDATE_PINCODE: BASE_URL + "/api/v1/user/wallet/pincode/validate",
	SEND_BALANCE: BASE_URL + "/api/v1/user/wallet/balance/send",
	SEARCH_USERS: BASE_URL + "/api/v1/users/by/name",

	APP_ID: "5ebbd564eac2970b388c3e51",
	TOKEN:
		// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGIyMjBmMDE1YzkxMDAxOGVkZjQ5YSIsImlhdCI6MTY0MTc1MTA5MSwiZXhwIjoxNjQ0MzQzMDkxfQ.AAxEmFITYZKiV2TSxMsVGLUPrc2vVe48pIdSVVttJNk',
		// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOThmMGY5ZmEwOWQyMDAxODQ4MThjOCIsImlhdCI6MTY0MDk2NTA4NywiZXhwIjoxNjQzNTU3MDg3fQ.HtuKxcDgWAAx4hC4CfnenzNqzlYffThS6ZI-2Mv7Au0',
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODMzNmZhN2Y2YTc4MDAxNzZmOTBiMSIsImlhdCI6MTY1NjE4MDgwMSwiZXhwIjoxNjU4NzcyODAxfQ.6N7MGsF9Mr9jiCpfxifPzqh27EA8RbGtMAsJLmG6cP0"
};

export default endpoints;
