import request from './request'


// 发送验证码
export const sendCode = (mobile) => {
	return request.get('/v1_0/sms/codes/' + mobile)
}

// 登录
export const login = (mobile, code) => {
	return request.post('/v1_0/authorizations', { mobile, code })
}