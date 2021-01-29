import { LightningElement ,track } from 'lwc';
import getAccounts from '@salesforce/apex/TileController.getAccounts';

export default class LoadingSpinner extends LightningElement {
   

    @track accounts;
    @track loading=false;
   getAccounts(){
        this.loading=true;
        getAccounts().then(result=>{
            this.accounts=result;
            this.loading=false;
        })
        .catch(error=>{
            console.log('error#'+error);
            this.loading=false;
        })

   }
}