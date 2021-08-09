export class TaskSearchValues {
    public  title:String='';
    public  completed:number=null;
    public  date:Date=null;
    public  priorityId:number=null;
    public  categoryId:number=null;

    public  pageNumber:number=0;

    public  pageSize:number=5;
    public  sortColumn:String='title';
    public  sortDirection:String='asc';
}
