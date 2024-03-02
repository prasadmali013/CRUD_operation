import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categorycrud',
  templateUrl: './categorycrud.component.html',
  styleUrl: './categorycrud.component.scss'
})
export class CategorycrudComponent {
  
  categoryArray: any[]=[];
  isResultLoaded=false;
  isUpdateFormActive = false;

  category_name: String="";
  currentcategoryID: string="";

  constructor(private http: HttpClient ) 
  {
    this.getAllcategory();
  }
  ngOnInit(): void {
  }
  getAllcategory()
  { 
    this.http.get("http://localhost:8085/api/category")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.categoryArray = resultData.data;
    });
  }
  
  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "category_name" : this.category_name,
      
    };
    this.http.post("http://localhost:8085/api/category/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Successfully")
        this.getAllcategory();
      //  this.name = '';
      //  this.address = '';
      //  this.mobile  = 0;
    });
  }
  setUpdate(data: any) 
  {
   this.category_name = data.category_name;
   //this.category_id = data.category_id;
  
 
  }
  UpdateRecords()
  {
    let bodyData = 
    {
      "category_name" : this.category_name
     // "category_id" : this.category_id,
      
    };
    
    this.http.put("http://localhost:8085/api/category/update/"+ this.currentcategoryID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("category Registered Updateddd")
        this.getAllcategory();
      
    });
  }
 
  save()
  {
    if(this.currentcategoryID == '')
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
    this.http.delete(`http://localhost:8085/api/category/delete/${data.category_id}`).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("category Deletedddd")
        this.getAllcategory();
    });
  }
 
}

