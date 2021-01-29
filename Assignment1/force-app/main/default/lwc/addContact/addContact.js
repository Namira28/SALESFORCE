import { LightningElement } from 'lwc';
import {ShowtoastEvent} from 'lightning/platformShowToastEvent';
import NAME_FIELDC from '@salesforce/schema/Contact.Name';
import PHONE_FIELDC from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELDC from '@salesforce/schema/Contact.Email';
import TITLE_FIELDC from '@salesforce/schema/Contact.Title';
import {createRecord} from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class AddContact extends NavigationMixin(LightningElement) {

    name='';
    title='';
    email='';
    phone='';

    contactId='';
    
    handleChange(event){
        if(event.target.label=='Name'){
            this.name=event.target.value;
        }
        if(event.target.label=='Title'){
            this.title=event.target.value;
        }
        if(event.target.label=='Email'){
            this.email=event.target.value;
        }
        if(event.target.label=='Phone'){
            this.phone=event.target.value;
        }
    }

    createContact(){
        const fields={};
        fields[NAME_FIELDC.fieldApiName]=this.name;
        fields[EMAIL_FIELDC.fieldApiName]=this.email;
        fields[PHONE_FIELDC.fieldApiName]=this.phone;
        fields[TITLE_FIELDC.fieldApiName]=this.title;

        const recordInput={apiName:CONTACT_OBJECT.objectAPiName,fields};
        createRecord(recordInput)
            .then(contact=>{
                this.contactId= contact.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact created',
                        variant: 'success',
                    }),
                );
            
            this[NavigationMixin.Navigate]({
                type:'standard__recordPage',
                attributes:{
                    recordId: contact.id,
                    objectApiName: 'Contact',
                    actionName:'view'
                },
            });
        })
        .catch(error=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error craeting record',
                    message: error.body.message,
                    variant:'error',
                }),
            );
        });
    }

}