import { LightningElement, api, track, wire } from 'lwc';
import getProductData from '@salesforce/apex/Controller.getProductData';
import PRODUCT_OBJECT from '@salesforce/schema/Product2';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { deleteRecord } from 'lightning/uiRecordApi';
import EDIT from '@salesforce/resourceUrl/edit';
import DELETE from '@salesforce/resourceUrl/delete';
import BIG from '@salesforce/resourceUrl/big';
import imagecss from '@salesforce/resourceUrl/Imagecss';
import { loadStyle } from 'lightning/platformResourceLoader';


export default class DropdownViewCss extends NavigationMixin(LightningElement) {
    get options() {
        return [
            { label: 'Accordion View', value: 'Accordion View' },
            { label: 'Card View', value: 'Card View' },
            { label: 'Tile View', value: 'Tile View' },
            { label: 'Flipping Cards', value: 'Flipping Cards' },
            { label: 'Sliding Cards', value: 'Sliding Cards'}
        ];
    }
    @api filterField;
    filterValue='';
    @track filterType="data.fields.Name.dataType";
    @track showacc=false;
    @track showcard=false;
    @track first;
    objectApiName=PRODUCT_OBJECT;   
    @track showtile=false;
    @track showflip=false;
    @track showslide=false;
    @track loading=false;
    handleSearchTermChange(event){
        window.clearTimeout(this.delayTimeout);
        const  filterValue= event.target.value;
        this.delayTimeout=setTimeout(()=>{
            this.loading=true;
            this.filterValue=filterValue;
        },300);
    }

    handleChange(event) {
        this.loading=true;
        console.log(this.loading);
        // alert(this.loading);
        // setTimeout(function(){ 
        this.value = event.detail.value;
        if(this.value=='Accordion View'){
            this.showacc=true;
            this.showcard=false; this.showtile=false; this.showflip=false; this.showslide=false;
        }
        else if(this.value=="Card View"){
            this.showcard=true;
            this.showacc=false; this.showtile=false; this.showflip=false; this.showslide=false;
        }
        else if(this.value=="Tile View"){
            this.showtile=true;
            this.showcard=false; this.showacc=false; this.showflip=false; this.showslide=false;
        }
        else if(this.value=="Flipping Cards"){
            this.showflip=true;
            this.showcard=false; this.showacc=false; this.showtile=false; this.showslide=false;
        }
        else if(this.value=="Sliding Cards"){
            this.showslide=true;
            this.showacc=false; this.showcard=false; this.showtile=false; this.showflip=false;
            
        }
        this.loading=false;
        console.log(this.loading);
    // }, 50);
        // alert(this.loading);
    }
    //js code to display card view data starts here
    @api FieldValues;
    @track isDetailviewModal = false;
    @track pid;
    @track nameArr=[];
    @track multiple = true;
    @track products ;
    @track error;
    @track refreshProductList;
    
    @wire(getProductData,{filterField:'$filterField', filterValue:'$filterValue'}) 
    wiredProduct(results) {
        this.loading=true;
        // alert("hiii");
        setTimeout(function(){ }, 3000);
        this.refreshProductList = results;
        if (results.data) {
             this.delayTimeout=setTimeout(()=>{
            setTimeout(function(){  }, 3000);
        },3000);
            this.nameArr=[];
            this.products = results.data;
            if(this.FieldValues && this.products){
                // this.nameArr=this.FieldValues.split(',');
                for(let i of this.products){
                    let obj=[];
                    //let prodId=i.Id;
                    let productObj={
                        prodId: i.Id,
                        prodName: i.Name,
                        prodImg: i.Product_Image__c
                    };

                    for(let j of this.FieldValues.split(',')){
                        // obj[j]=i[j];
                        // obj+=i[j]+"\n";
                        let obj2={data:""};
                        obj2.data=j+"  :  "+i[j];
                        //obj2.prodId=prodId;
                        obj.push(obj2);
                        // this.fieldArr.push(j);
                    }
                    productObj.fields=obj;
                    this.nameArr.push(productObj);
                    //this.nameArr.prodId=prodId;
                }
                console.log(this.nameArr);
                console.log(this.products);
                
            }
        } else if (results.error) {
            this.error = results.error;
        }
        // alert("bye");
        this.loading=false;
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

                console.log("hiiii......"); refreshApex(this.refreshProductList);
                this.isDetailShowModal = false;
                this[NavigationMixin.Navigate]({
                    attributes: {
                        objectApiName: PRODUCT_OBJECT,
                        actionName: 'home',
                    },
                });     
            })
            .then(()=>refreshApex(this.refreshProductList)
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            }));
            // refreshApex(this.products);
            
    }
    
    handleView(event){
        //getting record id using name attribute
        const selectedRecordId = event.currentTarget.name;
        console.log(selectedRecordId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: selectedRecordId,
                objectApiName: 'Product2', // objectApiName is optional
                actionName: 'view'
            }
        });
        
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
    

    //to display detailed view in sliding card
    handleShowResults(event){
        if(this.first!==undefined){
            this.template.querySelector(`[data-id="${this.first}"]`).classList.remove("active");
        }
        this.first=event.currentTarget.dataset.val;
        this.template.querySelector(`[data-id="${this.first}"]`).classList.add("active");
    }


    handleSuccess(event){
        refreshApex(this.refreshProductList);
        const toastevent=new ShowToastEvent({
            title:"Product created",
            message: "Record ID: "+event.detail.id,
            variant:"success"

        });
        this.dispatchEvent(toastevent);
        
        this.isShowModal = false;
        // this.delayTimeout=setTimeout(()=>{
            
        // },3000);
        
    }

    showDetailsModalBox(event) {  
        this.isDetailviewModal = true;
        this.pid=event.currentTarget.dataset.val;
        console.log("detail",this.pid);
        //event.preventDefault();
        // alert(this.pid);
    }
    
    hideDetailModalBox() {  
        this.isDetailviewModal = false

    }

    showDetailsModalBox2(event) {  
        this.isDetailviewModal = true;
        this.pid=event.currentTarget.dataset.val;
        console.log("detail",this.pid);
    }

    hideDetailModalBox2() {  
        this.isDetailviewModal = false

    }

    handleClickAccordion(event){
        this.delayTimeout=setTimeout(()=>{
            
        },3000);
        
        let i;
        var e=this.template.querySelectorAll('.slds-accordion__section');
        for(i=0;i<e.length;i++){
            e[i].className='slds-accordion__section';
        }
        event.currentTarget.className='slds-accordion__section slds-is-open'
        
    }
    

    connectedCallback(){
        loadStyle(this,imagecss);
    }
    imagePath1=EDIT;
    imagePath2=DELETE;
    imagePath3=BIG;


    @track isShowModal = false;
    showModalBox(event) {  
        this.isShowModal = true;
        // this.x=event.target.name;
        // this.x=event.currentTarget.dataset.id;
    }

    hideModalBox() {  
        refreshApex(this.refreshProductList);
        this.isShowModal = false;
    }

    

}