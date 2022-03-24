import {request, Response} from "./requests"

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

export function logout() {
    storage.clear()
}

export function login(email: string, password: string, callback: (code: number, data: any | null) => void) {
    request("user/login", {"email": email, "password": password}, (status, obj: Response) => {
        if (status == 200 && obj?.data != null) {
            if (obj.code == 200 && obj.data.token != null) {
                storage.setItem("token", obj.data.token)
                callback(obj.code, obj.data)
            } else {
                callback(obj.code, null)
            }
        } else {
            callback(400, null)
        }
    })
}

export function register(email: string, password: string, callback: (code: number, data: any | null) => void ) {

}