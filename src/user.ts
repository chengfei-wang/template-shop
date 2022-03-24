import {request, Response} from "./requests"
import {ref} from "vue"

export class User {
    constructor(uid: string, name: string, email: string) {
        this.uid = uid
        this.name = name
        this.email = email
    }

    uid: string
    name: string
    email: string
}

let storage = window.localStorage

export let currentUser = ref<User | null>()

export function logout() {
    currentUser.value = null
    storage.clear()
    window.location.href = "/login"
}

export function login(email: string, password: string, callback: (code: number, data: any | null) => void) {
    request("user/login", {"email": email, "password": password}, (status, obj: Response) => {
        if (status == 200) {
            if (obj.code == 200 && obj?.data.token != null) {
                storage.setItem("token", obj.data.token)
                callback(obj.code, obj.data)
            } else {
                callback(obj.code, null)
            }
        } else {
            callback(500, null)
        }
    })
}

export function register(email: string, name: string, password: string, callback: (code: number, message: string, data: any | null) => void ) {
    request("user/register", {"email": email, "name": name, "password": password}, (status, obj: Response) => {
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