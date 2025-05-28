export type LoginRequest = {
	email: string;
	password: string;
};

export type RegisterRequest = {
	email: string;
	password: string;
	name: string;
	role?: 'admin' | 'user';
};

export type RefreshToken = {
	refreshToken: string;
};

export type AuthResponse = {
	accessToken: string;
	refreshToken: string;
};

export type ChangePasswordRequest = {
	email: string;
	otp: string;
	oldPassword: string;
	newPassword: string;
};
