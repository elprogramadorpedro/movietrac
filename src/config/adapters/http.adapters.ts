export abstract class HttpAdapters {
    abstract get<T>(url:string, option?: Record<string,unknown >):Promise<T>;
}