import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-productcrud',
  templateUrl: './productcrud.component.html',
  styleUrl: './productcrud.component.scss'
})
export class ProductcrudComponent {
categoryPage() {
throw new Error('Method not implemented.');
}

        productArray: any[]=[];
        isResultLoaded= true;
        isUpdateFormActive = false;


        product_id: string="";
        product_name: String="";
        category_id: String="";
        category_name:string="";
  currentproductID: string="";


constructor(private http: HttpClient ) 
  {
    this.getAllProduct();
  }
  ngOnInit(): void {
  }
  getAllProduct()
  { 
    this.http.get("http://localhost:8085/api/products")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.productArray = resultData.data;
    });
  }
  
  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      
      "product_name" : this.product_name,
      "category_id" : this.category_id,
      "category_name" : this.category_name,
    };
    this.http.post("http://localhost:8085/api/products/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllProduct();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
  setUpdate(data: any) 
  {
   this.currentproductID=data.currentproductID;
   this.product_name = data.product_name;
   this.category_id = data.category_id;
   this.category_name=data.category_name;
  
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "product_name" : this.product_name,
      "category_id" : this.category_id,
      "category_name" : this.category_name
      
    };
    
    this.http.put("http://localhost:8085/api/products/update"+ this.currentproductID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Products Registered Updateddd")
        this.getAllProduct();
      
    });
  }
 
  save()
  {
    if(this.currentproductID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(data: any)
  {
    this.http.delete(`http://localhost:9002/api/products/delete/${data.product_id}`).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("product Deletedddd")
        this.getAllProduct();
    });
  }
}



