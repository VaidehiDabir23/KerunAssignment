import { LightningElement } from 'lwc';

export default class StockExchange extends LightningElement {

    columns = [];
    rows = [];
    categories = new Map();

    connectedCallback(){
        console.log('inside connectedCallBack');
        this.getStocks();
        this.getCategories();
    }
    buildColumnsAndRows(data){
        console.log('inside buildColumnsAndRows');
        
        const columns = new Map();
        columns.set("Entity", {label: "Entity", fieldName: "Entity", type: "text"});
        columns.set("Category", { label: "Category", fieldName: "Category", type: "text" });
        columns.set("Amount", { label: "Amount", fieldName: "Amount", type: "number"});
        columns.set("PricePerStock", { label: "PricePerStock", fieldName: "PricePerStock", type: "currency",
                            typeAttributes: { currencyCode: "EUR", step: "0.001" }}); 
        console.log("columns : "+columns);

        const rows = new Map();
        for(const row of data){
            rows.set(row.Entity, {Entity: row.Entity, Category: this.categories.get(row.Category).Name, Amount: row.Amount, PricePerStock: row.PricePerStock});
        }

        console.log("rows: "+rows);
        this.columns = Array.from(columns.values());
        this.rows = Array.from(rows.values());
    }
    
    async getStocks(){
    try {
        const response = await fetch("https://e2af7f77-77a7-4a41-b338-39d484c85745.mock.pstmn.io/stocks");
        if (!response.ok) {
            throw Error(response);
        }
        const myItems = await response.json();
        console.log('myItems : '+JSON.stringify(myItems));
        this.buildColumnsAndRows(myItems);
    } catch (error) {
        console.log("Error: "+error.message);
    } 
    }

    async getCategories(){
        console.log("inside getCategories");
        try{
            const response = await fetch("https://e2af7f77-77a7-4a41-b338-39d484c85745.mock.pstmn.io/categories");
            if(!response.ok){
                throw Error(response);
            }
            const result = await response.json();
            console.log("categories: " + JSON.stringify(result));

            for(const category of result){
                this.categories.set(category.Id, {Id: category.Id, Name: category.Name});
            }

            console.log('category values : '+this.categories.values())

        }catch(error){
            console.log('Error: '+error.message);
        }
    }
}