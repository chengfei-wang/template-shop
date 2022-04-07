export class Template {
    tid: string
    creator: string
    title: string
    content?: string
    updateTime: Date

    constructor(tid: string, creator: string, title: string, updateTime: string, content?: string) {
        this.tid = tid;
        this.creator = creator;
        this.title = title;
        this.updateTime = new Date(updateTime);
        this.content = content;
    }
}

export function eval_template(obj: any): Template {
    return new Template(obj.tid, obj.creator, obj.title, obj.updateTime, obj.content)
}

export class TemplateShare {
    tid: string
    creator: string
    title: string
    price: number
    shareTime: Date

    constructor(tid: string, creator: string, title: string, price: number, shareTime: string) {
        this.tid = tid;
        this.creator = creator;
        this.title = title;
        this.price = price;
        this.shareTime = new Date(shareTime);
    }
}

export function eval_template_share(obj: any): TemplateShare {
    return new TemplateShare(obj.tid, obj.creator, obj.title, obj.price, obj.shareTime)
}