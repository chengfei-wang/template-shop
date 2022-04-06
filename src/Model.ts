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