import { eval_user_simple, UserSimple } from "./User"

export interface Template {
    tid: string
    creator: string
    title: string
    content?: string
    updateTime: Date
}

export function eval_template(obj: any): Template {
    return { tid: obj.tid, creator: obj.creator, title: obj.title, updateTime: new Date(obj.updateTime), content: obj.content }
}

export interface TemplateShare {
    tid: string
    creator: string
    title: string
    price: number
    shareTime: Date
}

export function eval_template_share(obj: any): TemplateShare {
    return { tid: obj.tid, creator: obj.creator, title: obj.title, price: obj.price, shareTime: new Date(obj.shareTime) }
}

export interface TemplateOrder {
    orderId: string
    template: TemplateShare
    buyer: UserSimple
    price: number
    orderTime: Date
}

export function eval_template_order(obj: any): TemplateOrder {
    return {
        orderId: obj.orderId,
        template: eval_template_share(obj.template),
        buyer: eval_user_simple(obj.buyer),
        price: obj.price,
        orderTime: new Date(obj.orderTime)
    }
}


export interface Image {
    imageId: string
    imageOwner: string
    uploadTime: Date
}

export function eval_image(obj: any): Image {
    return { imageId: obj.imageId, imageOwner: obj.imageOwner, uploadTime: new Date(obj.uploadTime) }
}

export interface DeployInfo {
    deployId: string
    deployTemplate: string
    deployType: string
    userVerify: string
    deployAddition: string[]
    price: number
    pagePath: string
    deployTime: Date
}

export interface AccessLog {
    accessId: string;
    accessPage: string;
    accessIpAddress: string;
    accessTime: Date;
}

export interface DeployOption {
    id: string
    group: string
    name: string
    price: number
    description: string
}