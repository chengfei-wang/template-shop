export class Template {
    tid: string
    creator: string
    title: string
    content?: string


    constructor(tid: string, creator: string, title: string, content?: string) {
        this.tid = tid;
        this.creator = creator;
        this.title = title;
        this.content = content;
    }
}