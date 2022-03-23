import {request} from "./requests"

export class User {
    constructor(uid: string, name: string, email: string, token: string) {
        this.uid = uid
        this.name = name
        this.email = email
        this.token = token
    }

    uid: string
    name: string
    email: string
    token: string
}

let storage = window.localStorage

export function getUser(): User {
    let uid = storage.getItem("uid")
    let name = storage.getItem("name")
    let email = storage.getItem("email")
    let token = storage.getItem("token")
    return new User(uid!, name!, email!, token!);
}

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