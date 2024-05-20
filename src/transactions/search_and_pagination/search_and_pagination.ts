import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { chunk } from 'lodash';

type ImplementStrType = "by-key" | "for-all"

@Injectable()
export class SearchAndPagination {
    async transactionFunc(fieldNameArr:string[], data:CreateTransactionDto[], numOfRowsPerPage:number, searchQuery:string, searchKey:string = "", pageIndex:number, implementStr?:ImplementStrType){
        try{
            if(implementStr == "for-all"){ //For searching for all values in all searchkeys
                const queryResult:any = data.filter((elem)=>(
                    String(elem[fieldNameArr[0]]).toLowerCase().includes(String(searchQuery).toLowerCase()) || 
                    String(elem[fieldNameArr[1]]).toLowerCase().includes(String(searchQuery).toLowerCase()) 
                    || 
                    String(elem[fieldNameArr[2]]).toLowerCase().includes(String(searchQuery).toLowerCase()) || 
                    String(elem[fieldNameArr[3]]).toLowerCase().includes(String(searchQuery).toLowerCase()) || 
                    String(elem[fieldNameArr[4]]).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
                    String(elem[fieldNameArr[5]]).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
                    String(elem[fieldNameArr[6]]).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
                    String(elem[fieldNameArr[7]]).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
                    String(elem[fieldNameArr[8]]).toLowerCase().includes(String(searchQuery).toLowerCase()) ||
                    String(elem[fieldNameArr[9]]).toLowerCase().includes(String(searchQuery).toLowerCase())
                )).map((elem:any)=>{
                    return {
                        id: elem.id,
                        txid: elem.txid,
                        t_type: elem.t_type,
                        acctno: elem.acctno,
                        amount: elem.amount,
                        fn: elem.fn,
                        phone: elem.phone,
                        username: elem.username,
                        isSync: elem.isSync,
                        date_time: elem.date_time
                    };
                })
                
                const pages = chunk(queryResult, numOfRowsPerPage).length;
                const finalResult = chunk(queryResult, numOfRowsPerPage)[pageIndex-1];
                return {pages, queryResult: finalResult};
            }
            else if(implementStr == "by-key"){
                console.log("_________searchQuery_________")
                console.log(searchQuery)

                const queryResult:any = data.filter((elem)=>{
                    if(String(elem[fieldNameArr[0]]).toLowerCase()==(String(searchQuery).toLowerCase()) && fieldNameArr[0] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[1]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[1] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[2]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[2] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[3]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[3] == searchKey){
                        return true;
                    }
                    if((`${elem[fieldNameArr[4]]}`).toLowerCase().includes(searchQuery.toLowerCase()) && fieldNameArr[4] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[5]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[5] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[6]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[6] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[7]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[7] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[8]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[8] == searchKey){
                        return true;
                    }
                    if(String(elem[fieldNameArr[9]]).toLowerCase().includes(String(searchQuery).toLowerCase()) && fieldNameArr[9] == searchKey){
                        return true;
                    }
                }).map((elem:any)=>{
                    return {
                        id: elem.id,
                        txid: elem.txid,
                        t_type: elem.t_type,
                        acctno: elem.acctno,
                        amount: elem.amount,
                        fn: elem.fn,
                        phone: elem.phone,
                        username: elem.username,
                        isSync: elem.isSync,
                        date_time: elem.date_time
                    };
                })
                
                const pages = chunk(queryResult, numOfRowsPerPage).length;
                const finalResult = chunk(queryResult, numOfRowsPerPage)[pageIndex-1];
                return {pages, queryResult: finalResult};
            }

        }catch(e){
            console.error(e);
          }
    }
}
