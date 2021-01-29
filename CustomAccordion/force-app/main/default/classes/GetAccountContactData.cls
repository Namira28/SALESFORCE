public with sharing class GetAccountContactData {
    @AuraEnabled(cacheable=true)
    public static Account[] getAccountData() {
        return [SELECT Id, Name ,Type, Phone, Rating,Rating_Icon__c,(Select Id ,Name, Title, Email, Phone from Contacts) from Account WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static Account[] searchAccounts(String searchTerm){
        searchTerm=searchTerm.trim();
        if(searchTerm==''){
            return getAccountData();
        }
        searchTerm= '%'+searchTerm+'%';
        return [SELECT Id, Name ,Type, Phone, Rating,Rating_Icon__c,(Select Id ,Name, Title, Email, Phone from Contacts) from Account
        WHERE Name LIKE :searchTerm WITH SECURITY_ENFORCED
        ORDER BY Name
        ];
    
    }
}