import { LightningElement , track} from 'lwc';
import NAME_FIELDC from '@salesforce/schema/Contact.Name';
import PHONE_FIELDC from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELDC from '@salesforce/schema/Contact.Email';
import TITLE_FIELDC from '@salesforce/schema/Contact.Title';
import ACCOUNTNAME_FIELDC from '@salesforce/schema/Contact.AccountId';

// import fetchContacts from '@salesforce/apex/ContactController.fetchContacts';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import CONTACT_OBJECT from '@salesforce/schema/Contact'

export default class NewContact extends LightningElement {
    objectApiName = CONTACT_OBJECT;
    fields=[ACCOUNTNAME_FIELDC,NAME_FIELDC, PHONE_FIELDC,EMAIL_FIELDC,TITLE_FIELDC];

    handleSuccess(event){
        const toastevent=new ShowToastEvent({
            title:"Contact created",
            message: "Record ID: "+event.detail.id,
            variant:"success"
        });
        this.dispatchEvent(toastevent);
    }
    handleaddcontact(event){
        alert("hiii");
        alert("byee");
        window.location.href = "https://www.youtube.com/";
        // document.write("<lightning-card><lightning-record-form object-api-name={objectApiName} fields={fields} onsuccess={handleSuccess}></lightning-record-form></lightning-card>");
        
    }


    @track isShowModal = false;

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }
}