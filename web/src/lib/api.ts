import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, VerifyUserPayload, VerifyUserResponse, ResetPasswordPayload, ResetPasswordResponse, GetProfileResponse, UpdateProfilePayload, UpdateProfileResponse } from "./type"

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'

const API_BASE = `${API_URL}/api/v1`

async function request<T>(path: string, init?: RequestInit, retryOn401 = true): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...(init?.headers ?? {}),
		},
		...init,
	})

	const isJson = response.headers.get('content-type')?.includes('application/json')
	const data = isJson ? await response.json() : undefined

    if (!response.ok) {
        // If unauthorized, try refreshing token once
        if (response.status === 401 && retryOn401) {
            const refreshed = await refreshToken()
            if (refreshed) {
                return request<T>(path, init, false)
            }
            // if refresh fails, redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/login'
            }
            throw new Error('Unauthorized')
        }
        const message = (data as any)?.message || 'Request failed'
        throw new Error(message)
    }

	return (data as T)
}



export async function login(payload: LoginPayload) {
	return request<LoginResponse>('/login', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
}

export async function register(payload: RegisterPayload) {
	return request<RegisterResponse>('/users', {
		method: 'POST',
		body: JSON.stringify(payload),
	})
}

export async function verifyUser(payload: VerifyUserPayload) {
    return request<VerifyUserResponse>('/verify-user', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function resetPassword(payload: ResetPasswordPayload) {
    return request<ResetPasswordResponse>('/reset-password', {
        method: 'POST',
        body: JSON.stringify(payload),
    })
}

export async function getProfile() {
    return request<GetProfileResponse>('/users', {
        method: 'GET',
    })
}

export async function updateProfile(payload: UpdateProfilePayload) {
    return request<UpdateProfileResponse>('/users', {
        method: 'PATCH',
        body: JSON.stringify(payload),
    })
}

async function refreshToken(): Promise<boolean> {
    try {
        const res = await request<{ status: number; message: string; accessToken?: string; refreshToken?: string }>(
            '/refresh-token',
            { method: 'POST' },
            false,
        )
        if (res?.accessToken) {
            setAccessToken(res.accessToken)
        }
        return true
    } catch {
        return false
    }
}

export function setAccessToken(token: string | null) {
    if (typeof window === 'undefined') return
    if (!token) {
        localStorage.removeItem('accessToken')
        return
    }
    localStorage.setItem('accessToken', token)
}

export function getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
}
