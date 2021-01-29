import { LightningElement } from 'lwc';

import HOTE from '@salesforce/resourceUrl/Hot';
import WARME from '@salesforce/resourceUrl/Warm';
import COLDE from '@salesforce/resourceUrl/Cold';

export default class CarouselnStaticR extends LightningElement {

    imagePath1=HOTE;
    imagePath2=WARME;
    imagePath3=COLDE;

}