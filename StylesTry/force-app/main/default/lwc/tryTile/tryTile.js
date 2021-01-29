import { api, LightningElement ,track,wire } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import RATING_FIELD from '@salesforce/schema/Account.Rating';

import getAccounts from '@salesforce/apex/TileController.getAccounts';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import { refreshApex } from '@salesforce/apex';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';

const COLUMNS = [

    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'Name' },
    {label: 'Type', fieldName: TYPE_FIELD.fieldApiName, type: 'Picklist' },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'Phone' },
    {label: 'Rating', fieldName: RATING_FIELD.fieldApiName, type: 'Picklist' }
];


export default class TryTile extends LightningElement {

    @wire(getAccounts)
    accounts; 

    @track x;
    handleClick(event){
        this.x="https://resilient-unicorn-8cdk1m-dev-ed.lightning.force.com/lightning/r/Account/"+event.currentTarget.name + '/view';
    }
    handleClick2(event){
        window.open("https://resilient-unicorn-8cdk1m-dev-ed.lightning.force.com/lightning/r/Account/"+event.currentTarget.name + '/view');
    }

    handleSuccess(event){
        alert(this.y);
        const toastevent=new ShowToastEvent({
            title:"Contact created",
            message: "Record ID: "+event.detail.id,
            variant:"success"

        });
        this.dispatchEvent(toastevent);
        // refreshApex(this.accounts);
        this.isShowModal = false;
        // this.delayTimeout=setTimeout(()=>{
            
        // },3000);
        
    }


    objectApiName = CONTACT_OBJECT;

   @track isShowModal = false;
   @track y;
    showModalBox(event) {  
        this.isShowModal = true;
        // this.x=event.target.name;
        this.y=event.currentTarget.dataset.id;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

}