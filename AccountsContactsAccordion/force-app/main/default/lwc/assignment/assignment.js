import { api, LightningElement ,track,wire } from 'lwc';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import RATING_FIELD from '@salesforce/schema/Account.Rating';
import RATINGICON_FIELD from '@salesforce/schema/Account.Rating_Icon__c';

import getSearchAccounts from '@salesforce/apex/Controller.getSearchAccounts';

import NAME_FIELDC from '@salesforce/schema/Contact.Name';
import PHONE_FIELDC from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELDC from '@salesforce/schema/Contact.Email';
import TITLE_FIELDC from '@salesforce/schema/Contact.Title';
import ACCOUNTNAME_FIELDC from '@salesforce/schema/Contact.AccountId';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';


import { refreshApex } from '@salesforce/apex';

const COLUMNS = [

    { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'Name' },
    {label: 'Type', fieldName: TYPE_FIELD.fieldApiName, type: 'Picklist' },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'Phone' },
    {label: 'Rating', fieldName: RATING_FIELD.fieldApiName, type: 'Picklist' },
    {label: 'Rating Icon', fieldName: RATINGICON_FIELD.fieldApiName, type: 'formula' }
];


const COLUMNSC = [
    { label: 'Name', fieldName: NAME_FIELDC.fieldApiName, type: 'Name' },
    {label: 'Title', fieldName: TITLE_FIELDC.fieldApiName, type: 'Text' },
    { label: 'Phone', fieldName: PHONE_FIELDC.fieldApiName, type: 'Phone' },
    {label: 'Email', fieldName: EMAIL_FIELDC.fieldApiName, type: 'Email' }
    
];


export default class Assignment extends LightningElement {

    
    
    @api accId;
    accountname='';
    

    @wire(getSearchAccounts,{accountname:'$accountname'})
    accounts; 
    //data error 
    @track num;
    @track x;
    handleChange(event){
        window.clearTimeout(this.delayTimeout);
            const accountname=event.target.value;
            this.delayTimeout=setTimeout(()=>{
                this.accountname=accountname;
            },300);

        }
    
    get hasResults(){
        return (this.accounts.data.length>0);
    }


    activeSectionMessage = '';

    handleToggleSection1(event) {
        this.activeSectionMessage =
             'Account section name --  ' + event.detail.openSections;
    }

    showContact() {
        this.activeSectionMessage=key;
    }

    
    objectApiName = CONTACT_OBJECT;
    fields=[ACCOUNTNAME_FIELDC,NAME_FIELDC,PHONE_FIELDC,EMAIL_FIELDC,TITLE_FIELDC];
    handleSuccess(event){
        const toastevent=new ShowToastEvent({
            title:"Contact created",
            message: "Record ID: "+event.detail.id,
            variant:"success"

        });
        this.dispatchEvent(toastevent);
        refreshApex(this.accounts);
        this.isShowModal = false;
        // this.delayTimeout=setTimeout(()=>{
            
        // },3000);
        
    }



   @track isShowModal = false;
    showModalBox(event) {  
        this.isShowModal = true;
        // this.x=event.target.name;
        this.x=event.currentTarget.dataset.id;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

    @track isDetailShowModal = false;
    @track rid;
    showDetailsModalBox(event) {  
        this.isDetailShowModal = true;
        this.rid=event.target.name;
    }

    hideDetailModalBox() {  
        this.isDetailShowModal = false;

    }
  
   
}