import { api, LightningElement ,track,wire } from 'lwc';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import getProducts from '@salesforce/apex/Controller.getProducts';

import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

import imagecss from '@salesforce/resourceUrl/Imagecss';
import { loadStyle } from 'lightning/platformResourceLoader';

import EDIT from '@salesforce/resourceUrl/edit';
import DELETE from '@salesforce/resourceUrl/delete';
import BIG from '@salesforce/resourceUrl/big';

export default class Views extends LightningElement {

    @wire(getProducts)
    products;

    rowOffset = 0;
    // @track flag;
    // turnon(event){
    //     this.flag=event.currentTarget.dataset.val;
    // }


    handelShowResults(event){
        

        if(this.first!==undefined){
            this.template.querySelector(`[data-id="${this.first}"]`).classList.remove("active");
        }
        this.first=event.currentTarget.dataset.val;
        

        this.template.querySelector(`[data-id="${this.first}"]`).classList.add("active");
    }

    @track x;
    @track first;
    @track isDetailviewModal = false;
    @track pid;
    showDetailsModalBox2(event) {  
        this.isDetailviewModal = true;
        this.pid=event.currentTarget.dataset.val;
        console.log("detail",this.pid);
        //event.preventDefault();
        // alert(this.pid);
    }

    hideDetailModalBox2() {  
        this.isDetailviewModal = false

    }

    handleClick(event){
        this.x="https://resilient-unicorn-8cdk1m-dev-ed.lightning.force.com/lightning/r/Product/"+event.currentTarget.name + '/view';
    }

    handleClick2(event){
        window.open("https://resilient-unicorn-8cdk1m-dev-ed.lightning.force.com/lightning/r/Product/"+event.currentTarget.name + '/view');
    }

    objectApiName=PRODUCT_OBJECT;
    
    @track isDetailShowModal = false;
    @track rid;
    showDetailsModalBox(event) {  
        this.isDetailShowModal = true;
        this.rid=event.target.name;
    }

    hideDetailModalBox() {  
        this.isDetailShowModal = false;

    }

    handleSuccess(event){
        const toastevent=new ShowToastEvent({
            title:"Product created",
            message: "Record ID: "+event.detail.id,
            variant:"success"

        });
        this.dispatchEvent(toastevent);
        refreshApex(this.products);
        this.isShowModal = false;
        // this.delayTimeout=setTimeout(()=>{
            
        // },3000);
        
    }

    @track isShowModal = false;
    showModalBox(event) {  
        this.isShowModal = true;
        // this.x=event.target.name;
        // this.x=event.currentTarget.dataset.id;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }


    
    @api recordId;
    
    @track error;
    handledelete(event) {
        this.recordId=event.currentTarget.dataset.id;
        deleteRecord(this.recordId)
            .then(() => {
                this.first=undefined;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                // Navigate to a record home page after
                // the record is deleted, such as to the
                // contact home page
                console.log("hiiii......"); refreshApex(this.products);
                this.isDetailShowModal = false;
                this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: PRODUCT_OBJECT,
                        actionName: 'home',
                    },
                });
                
              
            })
            .then(()=>refreshApex(this.products))
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });
            refreshApex(this.products);
            
    }


    connectedCallback(){
        loadStyle(this,imagecss);
    }

    imagePath1=EDIT;
    imagePath2=DELETE;
    imagePath3=BIG;











    handleClickAccordion(event){
        let i;
        var e=this.template.querySelectorAll('.slds-accordion__section');
        for(i=0;i<e.length;i++){
            e[i].className='slds-accordion__section';
        }
        event.currentTarget.className='slds-accordion__section slds-is-open'
        
    }

    handleEdit(event){
        const selectedRecordId = event.target.name;
        console.log(selectedRecordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: selectedRecordId,
                objectApiName: 'Product2', // objectApiName is optional
                actionName: 'edit'
            }
       });
    }

}