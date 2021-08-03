import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class LocalStorageService<T> {
    constructor() { }

    setData(name: string, data: T): void {
        localStorage.setItem(name, JSON.stringify(data))
    }

    getData(name: string): T {
        return JSON.parse( localStorage.getItem(name) || "null") as T;  
    }

    deleteData(name: string): void {
        localStorage.removeItem(name);
    }
}