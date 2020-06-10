import request from './request'


// 发送验证码
export const sendCode = (mobile) => {
	return request.get('/v1_0/sms/codes/' + mobile)
}

// 登录
export const login = (mobile, code) => {
	return request.post('/v1_0/authorizations', { mobile, code })
}

// 搜索接口
export const search = (keywords) => {
	return request.get('/v1_0/search?q=' + keywords)
}

// 获取全部新闻频道
export const getAllChannels = () => {
	return request.get('/v1_0/channels')
}

// 获取用户的频道
export const getUserChannels = () => {
	return request.get('/v1_0/user/channels')
}