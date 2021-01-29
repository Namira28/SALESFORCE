public with sharing class Controller {
    @AuraEnabled(cacheable=true)
    public static Product2[] getAllProductData(){
        try {
            // return Database.query('SELECT Id,IsActive, CreatedById,CreatedBy.Name , LastModifiedById, ProductCode, Description, Product_Image__c, Name, StockKeepingUnit , QuantityUnitOfMeasure FROM Product2 WHERE '+filterField+' = :'+filterValue);
            return [SELECT Id,IsActive, CreatedById,CreatedBy.Name , LastModifiedById, Family,
            ProductCode, Description, Product_Image__c, Name, StockKeepingUnit , 
            QuantityUnitOfMeasure
            FROM Product2];
            

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static Product2[] getProductData( String filterField , String filterValue){
        try {
            if(filterValue==''){
                return getAllProductData();
            }
            filterValue='%'+filterValue+'%';
            // return Database.query('SELECT Id,IsActive, CreatedById,CreatedBy.Name , LastModifiedById, ProductCode, Description, Product_Image__c, Name, StockKeepingUnit , QuantityUnitOfMeasure FROM Product2 WHERE Name LIKE :filterValue');
            return [SELECT Id,IsActive, CreatedById,CreatedBy.Name , LastModifiedById, Family,
            ProductCode, Description, Product_Image__c, Name, StockKeepingUnit , 
            QuantityUnitOfMeasure
            FROM Product2 
            WHERE Name LIKE :filterValue];
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}