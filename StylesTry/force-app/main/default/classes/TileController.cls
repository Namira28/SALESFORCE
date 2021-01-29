public with sharing class TileController {
    public TileController() {

    }
    @AuraEnabled(cacheable=true)
    public static Account[] getAccounts(){
        try {
            return [SELECT Id,Name, Type, Phone, Rating FROM Account ORDER BY Name];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
