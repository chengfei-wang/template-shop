import { request, Response } from "./Request"

export interface User {
    uid: string
    name: string
    email: string
}

export function logout() {
    localStorage.clear()
    window.location.href = "/login"
}

export function login(email: string, password: string, callback: (code: number, data: any | null) => void) {
    request("user/login", { "email": email, "password": password }, (status, obj: Response) => {
        if (status == 200) {
            if (obj.code == 200 && obj?.data.token != null) {
                localStorage.setItem("token", obj.data.token)
                callback(obj.code, obj.data)
            } else {
                callback(obj.code, null)
            }
        } else {
            callback(500, null)
        }
    })
}

export function register(email: string, name: string, password: string, callback: (code: number, message: string, data: any | null) => void) {
    request("user/register", { "email": email, "name": name, "password": password }, (status, obj: Response) => {
        if (status == 200) {
            if (obj.code == 200 && obj?.data != null) {
                callback(obj.code, obj.message, obj.data)
            } else {
                callback(obj.code, obj.message, null)
            }
        } else {
            callback(500, "服务器异常", null)
        }
    })
}

export interface UserSimple {
    uid: string
    name: string
    email: string
}

export function eval_user_simple(obj: any): UserSimple {
    return { uid: obj.uid, name: obj.name, email: obj.email }
}