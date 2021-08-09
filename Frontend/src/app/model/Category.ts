export class Category{
    id: number;
    title:string;
    materialIcons?:string;
    completedCount?:number;
    uncompletedCount?:number;
    constructor(id: number, title: string,materialIcons?:string,completedCount?:number,uncompletedCount?:number) {
        this.id = id;
        this.title = title;
        this.materialIcons=materialIcons;
        this.completedCount=completedCount;
        this.uncompletedCount=uncompletedCount;
    }
    
}