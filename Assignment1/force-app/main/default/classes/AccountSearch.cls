 public with sharing class AccountSearch {
    public AccountSearch() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> searchgetAccounts(String gan){
    
        try {
            String keyStr='%'+gan+'%';
            return[
                select Id, Name from Account where Name like:keyStr
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
