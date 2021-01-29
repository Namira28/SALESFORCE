public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactByAccountId(String accountId) {
        return [
            SELECT Id, Name, Email, Phone
            FROM Contact
            WHERE AccountId=:accountId
            ORDER BY Name
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchContacts(String acc_name){
        try {
            return [
                SELECT Name,Title,Email,Phone
                FROM Contact
                WHERE  AccountId=:acc_name
                ORDER BY Name
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> displayConRecords(String accId){
        List<Contact> conlist=new List<Contact>();
       for(Contact con : [select Id, Name, AccountId from Contact where AccountId=:accId]){
        conlist.add(con);
       }
       return conlist;
    }
}