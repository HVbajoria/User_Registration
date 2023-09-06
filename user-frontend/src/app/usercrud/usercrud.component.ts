import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.scss']
})
export class UsercrudComponent implements OnInit {

  UserArray: any[] = [];
  isResultloaded = false;
  isUpdateFormActive = false;

  name: string = '';
  email: string = '';
  phone = 0;
  dob: string = '';
  college: string = '';
  graduation = 0;
  agreed = false;

  currentUserID = '';

  constructor(private http: HttpClient) {
    this.getAllUsers();
   }

  ngOnInit(): void {
  }

  getAllUsers() {
    this.http.get("http://127.0.0.1:8000/api/users").subscribe((res: any) => {
      this.UserArray = res;
      this.isResultloaded = true;
    });
  }

  addUser() {
    let data = {
      name: this.name,
      email: this.email,
      phone_number: this.phone,
      dob: this.dob,
      college_name: this.college,
      graduation_year: this.graduation,
    }
    if (!this.agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }
    this.http.post("http://127.0.0.1:8000/api/save", data).subscribe((res: any) => {
      this.getAllUsers();
      alert("User added successfully");
      this.resetForm();
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.phone = 0;
    this.dob = '';
    this.college = '';
    this.graduation = 0;
    this.agreed = false;
  }

  editUser(data: any){
    this.isUpdateFormActive = true;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone_number;
    this.dob = data.dob;
    this.college = data.college_name;
    this.graduation = data.graduation_year;
    this.agreed = true;
    this.currentUserID = data.id;
  }

  updateRecord(){
    let data = {
      name: this.name,
      email: this.email,
      phone_number: this.phone,
      dob: this.dob,
      college_name: this.college,
      graduation_year: this.graduation,
    }
    if (!this.agreed) {
      alert("Please agree to the terms and conditions");
      return;
    }
    this.http.put("http://127.0.0.1:8000/api/update/"+this.currentUserID, data).subscribe((res: any) => {
      alert("User updated successfully");  
      this.getAllUsers();
      this.resetForm();
      this.isUpdateFormActive = false;
    });
  }

  deleteUser(id: any){
    this.http.delete("http://127.0.0.1:8000/api/delete/"+id).subscribe((res: any) => {
      this.getAllUsers();
      alert("User deleted successfully");
    });
  }

  save(){
    if (this.isUpdateFormActive) {
      this.updateRecord();
    } else {
      this.addUser();
    }
  }
}