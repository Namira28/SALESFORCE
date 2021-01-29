import {LightningElement,api,wire,track} from 'lwc';
import getAccountData from '@salesforce/apex/GetAccountContactData.getAccountData';
import searchAccounts from '@salesforce/apex/GetAccountContactData.searchAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class AccordionEx extends NavigationMixin(LightningElement) { 

    searchTerm='';
    accounts;
    @wire(searchAccounts,{searchTerm:'$searchTerm'}) //$ cache
    // To display accounts and contacts data
    wiredAccount({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.accounts = undefined;
        } 
    }

    // For opening and closing of modal
    @track customFormModal = false; 
    @track x;
    customShowModalPopup(event) {            
        this.customFormModal = true;
        this.x=event.currentTarget.dataset.id;
    }
    customHideModalPopup() {    
        this.customFormModal = false;
    }

    // Expand and collapse of Accordion
    handleClick(event){
        let i;
        var e=this.template.querySelectorAll('.slds-accordion__section');
        for(i=0;i<e.length;i++){
            e[i].className='slds-accordion__section';
        }
        event.currentTarget.className='slds-accordion__section slds-is-open'
        
    }

    // test() {
    //     searchAccounts({ searchTerm: this.searchTerm })
    //         .then((result) => {
    //             this.accounts = result;
    //             //this.error = undefined;
    //         })
    //         .catch((error) => {
    //             //this.error = error;
    //             this.accounts = undefined;
    //         });
    // } 

    // To handle search input and provide output
    handleSearchTermChange(event){
        window.clearTimeout(this.delayTimeout);
        const searchTerm=event.target.value;
        this.delayTimeout=setTimeout(()=>{
            this.searchTerm=searchTerm;
        },50)
    }
    get hasResults(){
        return (this.accounts.length>0);
    }
    
    objectApiName = CONTACT_OBJECT;
    //fields = [ACCOUNTNAME_FIELD, NAME_FIELD, EMAIL_FIELD,PHONE_FIELD,TITLE_FIELD];
    connectedCallback() {
        window.addEventListener('accordionEx', this.handleSuccess);
    }
    
    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        //this.test();
        //refreshApex(this.accounts);
        this.customFormModal = false;
    }


}