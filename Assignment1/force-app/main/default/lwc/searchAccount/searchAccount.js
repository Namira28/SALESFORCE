import { LightningElement , wire, track} from 'lwc';
import searchgetAccounts from  '@salesforce/apex/AccountSearch.searchgetAccounts';

export default class SearchAccount extends LightningElement {

    accountName='';
    @track accountList=[];
    @wire(searchgetAccounts,{gan:'$accountName'})
    retrieveAccounts({error,data}){
        if(data){
            this.accountList=data;
        }
        else if(error){

        }
    }


    handleKeyChange(event){
        this.accountName= event.target.value;
    }

}