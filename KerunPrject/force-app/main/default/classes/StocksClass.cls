public with sharing class StocksClass {
    public static void getCategories(){
        HTTP http = new HTTP();

        HTTPRequest request = new HTTPRequest();
        request.setEndpoint('https://e2af7f77-77a7-4a41-b338-39d484c85745.mock.pstmn.io/categories');
        request.setMethod('GET');

        HTTPResponse response = http.send(request);
        System.debug('response.status = '+response.getStatusCode());
        System.debug('response.getBody() = '+response.getBody());

        Type resultType = Type.forName('StockClass');
        System.debug('resultType : '+resultType);
        //CategoryResponse deserializeResults =  (CategoryResponse)JSON.deserialize(response.getBody(),CategoryResponse.class);
        //CategoryResponse deserializeResults =  (CategoryResponse)JSON.deserialize(response.getBody(), resultType);
        //System.debug('deserializeResults : '+deserializeResults);
    }

    public static void getStocks(){
        Http http = new Http();
        HTTPRequest request = new HTTPRequest();
        request.setEndpoint('https://e2af7f77-77a7-4a41-b338-39d484c85745.mock.pstmn.io/stocks');
        request.setMethod('GET');
        request.setHeader('Content-Type', 'application/json');//assumed

        HTTPResponse response = http.send(request);
        System.debug('response.status stocks= '+response.getStatusCode());
        System.debug('response.getBody() stocks = '+response.getBody());
    }

    public static void postStocks(){
        HTTP http = new HTTP();

        HTTPRequest request = new HTTPRequest();
        request.setEndpoint('https://e2af7f77-77a7-4a41-b338-39d484c85745.mock.pstmn.io/update');
        request.setMethod('POST');

        HTTPResponse response = http.send(request);
        System.debug('response.status update= '+response.getStatusCode());
        System.debug('response.getBody() update = '+response.getBody());
    }

    public Class CategoryResponse{
        List<Category> categoryList;
    }

    Class Category{
        Integer Id;
        String Name;
    }

    Class Stock{
        String Entity;
        Integer Category;
        Integer Amount;
        Double PricePerStock;
    }
}
