import {request} from "./requests"

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

export function login(email: string, password: string, callback: Function) {
    request("user/login", {"email": email, "password": password}, (result: any) => {
        if (result?.data?.token != null) {
            storage.setItem("token", result?.data?.token)
            callback(result.data)
        } else {
            callback(null)
        }
    })
}