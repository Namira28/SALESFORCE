import { LightningElement, wire, api} from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

import findContactByAccountId from '@salesforce/apex/ContactController.findContactByAccountId';
const COLUMNS = [
    { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'Name' },
    {label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'Email' },
    { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'Phone' }
];
export default class ContactList extends LightningElement {
    columns = [
        
        { label: 'Name', fieldName: NAME_FIELD.fieldApiName, type: 'Name' },
        {label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'Email' },
        { label: 'Phone', fieldName: PHONE_FIELD.fieldApiName, type: 'Phone' }
    ];
    @api accountId;

    @wire (findContactByAccountId,{AccountId:'$accountId'})
    contacts;

    // get errors() {
    //     return (this.accounts.error) ?
    //         reduceErrors(this.accounts.error) : [];
    // }
}