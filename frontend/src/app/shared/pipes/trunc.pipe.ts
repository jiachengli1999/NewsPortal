import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name:"trunc"
})
export class Truncate implements PipeTransform{
    transform(value:string,...args:any[]){
        let len=args[0];
        if(value.length>len){
            return value.substring(0,len)+"...";
        }else{
            return value;
        }
    }
}