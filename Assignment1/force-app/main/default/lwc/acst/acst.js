import { LightningElement ,wire , track} from 'lwc';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import ACCOUNT_OBJECT from '@salesforce/schema/Account';

// import CONTACT_OBJECT from '@salesforce/schema/Contact';

// import NAME_FIELD from '@salesforce/schema/Account.Name';
// import PHONE_FIELD from '@salesforce/schema/Account.Phone';
// import TYPE_FIELD from '@salesforce/schema/Account.Type';
// import RATING_FIELD from '@salesforce/schema/Account.Rating';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';


// import NAME_FIELDC from '@salesforce/schema/Contact.Name';
// import PHONE_FIELDC from '@salesforce/schema/Contact.Phone';
// import EMAIL_FIELDC from '@salesforce/schema/Contact.Email';
// import TITLE_FIELDC from '@salesforce/schema/Contact.Title';
// import fetchContacts from '@salesforce/apex/ContactController.fetchContacts';

// import displayConRecords from '@salesforce/apex/ContactController.displayConRecords';
// const COLUMNS = [
//     { label: 'Account Name', fieldName: NAME_FIELD.fieldApiName, type: 'Name' },
//     {label: 'Type', fieldName: TYPE_FIELD.fieldApiName, type: 'Picklist' },
//     { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'Phone' },
//     {label: 'Rating', fieldName: RATING_FIELD.fieldApiName, type: 'Picklist' }
// ];



// const COLUMNSC = [
//     { label: 'Name', fieldName: NAME_FIELDC.fieldApiName, type: 'Name' },
//     {label: 'Title', fieldName: TITLE_FIELDC.fieldApiName, type: 'Text' },
//     { label: 'Phone', fieldName: PHONE_FIELDC.fieldApiName, type: 'Phone' },
//     {label: 'Email', fieldName: EMAIL_FIELDC.fieldApiName, type: 'Email' }
    
// ];
export default class LightningExampleAccordionBasic extends LightningElement {
    // objectApiName = ACCOUNT_OBJECT;
    // fields = [NAME_FIELD, TYPE_FIELD, PHONE_FIELD, RATING_FIELD];
    // columns = COLUMNS;

    @wire(getAccounts)
    accounts;

    // objectApiNameC = CONTACT_OBJECT;
    // fieldsC = [NAME_FIELDC, TITLE_FIELDC, PHONE_FIELDC, EMAIL_FIELDC];
    // columnsC = COLUMNSC;
    // @track searchKey = 'GenePoint';
    // @track err;
    // @wire(fetchContacts,{acc_name:'0015g000003pmCqAAI'})
    // contacts;

    // @wire(displayConRecords,{accId:'$accountId'})
    // wiredcondata({error,data}){
    //     if(data){
    //         this.records=data;
    //         this.error=undefined;
    //     }
    //     else{
    //         this.records=undefined;
    //         this.error=error;
    //     }
    // }


    // get errors() {
    //     return (this.accounts.error) ?
    //         reduceErrors(this.accounts.error) : [];
    // }
    // handleSuccess(event) {
    //     const toastEvent = new ShowToastEvent({
    //         title: "Account created",
    //         message: "Record ID: " + event.detail.id,
    //         variant: "success"
    //     });
    //     this.dispatchEvent(toastEvent);
    // } 

    
    activeSectionMessage = '';

    handleToggleSection(event) {
        this.activeSectionMessage =
             'Open section name:  ' + event.detail.openSections;
    }

    // handleSetActiveSectionC() {
    //     const accordion = this.template.querySelector('.example-accordion');

    //     accordion.activeSectionName = 'C';
    // }

    // get name() {
    //     return this.contacts.data.fields.Name.value;
    // }

    // get title() {
    //     return this.contacts.data.fields.Title.value;
    // }

    // get phone() {
    //     return this.contacts.data.fields.Phone.value;
    // }

    // get email() {
    //     return this.contacts.data.fields.Email.value;
    // }

}
