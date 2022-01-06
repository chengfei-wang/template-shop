export interface TemplateData {
    data: Array<DataItem>
}

enum DataType {
    str,
    num,
    tel,
    email,
    submit,
}

interface DataKey {
    type: DataType
    key: string
}

interface DataItem {
    key: DataKey
    name: string
    validate: Function
}