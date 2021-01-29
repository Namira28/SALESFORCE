public with sharing class Controller {
    public Controller() {

    }
    @AuraEnabled(cacheable=true)
    public static Product2[] getProducts(){
        try {
            return [SELECT Id,IsActive, CreatedById,CreatedBy.Name , LastModifiedById, 
            ProductCode, Description, Product_Image__c, Name, StockKeepingUnit , 
            QuantityUnitOfMeasure
            FROM Product2 ];

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
