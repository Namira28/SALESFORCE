public with sharing class Controller {
    public Controller() {

    }
    @AuraEnabled(cacheable=true)
    public static Account[] getAccounts(){
        try {
            return[SELECT Id,Name, Type, Phone, Rating ,Rating_Icon__c,(select Id ,Name, Title,Phone, Email from Contacts) FROM Account ORDER BY Name];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static Account[] getSearchAccounts(String accountname){
        try {
            if(accountname==''){return getAccounts();}
            else{
                accountname='%'+accountname+'%';
                return[SELECT Id,Name, Type, Phone, Rating,Rating_Icon__c, (select Id ,Name,Title, Phone, Email from Contacts) FROM Account WHERE Name LIKE :accountname ORDER BY Name];
            }

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    

}
