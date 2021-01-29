import { LightningElement ,track } from 'lwc';
import getAccounts from '@salesforce/apex/TileController.getAccounts';

export default class Spinner extends LightningElement {
    showOne=false

    spinnerHandler(event){ 
        const {name} = event.target
        this[name] = true
        let timer = window.setTimeout(()=>{ 
            this[name] = false
            window.clearTimeout(timer)
        }, 5000)
    }

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
