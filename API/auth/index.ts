import api, { handleError } from 'API'
import { AxiosError } from 'axios';
import { ILoginRequest, ILoginResponse, IResetPasswordRequest, ISignUpForm } from 'interfaces/auth'
import get from 'lodash/get'

const AUTH_URL = '/api/v1/auth'

export async function login(data: ILoginRequest): Promise<ILoginResponse> {
  try {
    const response = await api.post(`${AUTH_URL}/login`, data);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, 'API/auth', 'login');
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error);
    throw new Error(errorMessage);
  }
}

export async function signUp(data: ISignUpForm): Promise<ILoginResponse> {
  try {
    const response = await api.post(`${AUTH_URL}/signup`, data);
    return response.data.metadata;
  } catch (error) {
    handleError(error as Error, 'API/auth', 'signup');
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error);
    throw new Error(errorMessage);
  }
}

export async function forgotPassword(email: string): Promise<void> {
  try {
    await api.put(`${AUTH_URL}/forgot-password`, { email: email });
  } catch (error) {
    handleError(error as Error, 'API/auth', 'forgotPassword');
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error);
    throw new Error(errorMessage);
  }
}

export async function resetPassword(data: IResetPasswordRequest, token: string) {
  try {
    await api.put(`${AUTH_URL}/reset-password/${token}`, data);
  } catch (error) {
    handleError(error as Error, 'API/auth', 'resetPassword');
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error);
    throw new Error(errorMessage);
  }
}

