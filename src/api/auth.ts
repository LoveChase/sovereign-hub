import axios from 'utils/axios';

// Types
interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface UpdateProfileData {
    firstName: string;
    lastName: string;
    phone: string;
}

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

// API endpoints
export const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    changePassword: '/auth/change-password',
    updateProfile: '/users/profile',
    deleteAccount: '/users/account'
};

// API functions
export const login = async (data: LoginData) => {
    const response = await axios.post(endpoints.login, data);
    return response.data;
};

export const register = async (data: RegisterData) => {
    const response = await axios.post(endpoints.register, data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await axios.get(endpoints.me);
    return response.data;
};

export const changePassword = async (data: ChangePasswordData) => {
    const response = await axios.post(endpoints.changePassword, data);
    return response.data;
};

export const updateProfile = async (data: UpdateProfileData) => {
    const response = await axios.patch(endpoints.updateProfile, data);
    return response.data;
};

export const deleteAccount = async () => {
    const response = await axios.delete(endpoints.deleteAccount);
    return response.data;
}; 