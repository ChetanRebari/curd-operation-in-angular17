import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, MaxLengthValidator } from '@angular/forms';
import { SheredataService } from 'src/app/service/sheredata.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
 addButton: boolean=true;
  editButton:boolean=true;

  myform!: FormGroup;
  posts!: any[];
  updateBtn: boolean = true;

  constructor(private _fb: FormBuilder, private _service: SheredataService) { };

  ngOnInit(): void {
    this.myform = this._fb.group({
      id: [null],
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      mobile: ['',[Validators.required,Validators.minLength(10)]],
    });
    this.getPosts();
    
  }
  
  get fnamevalidator(){
    return this.myform.get("firstname")
  }
  get lnamevalidator(){
    return this.myform.get('lastname');
  }
  get emailvalidator(){
    return this.myform.get("email")
  }
  get mobilevalidator(){
    return this.myform.get("mobile")
  }



  getPosts() {
    this._service.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  };



  formValue(actionType: string) {
    const newPost = this.myform.value;
    if(actionType == 'addNew'){
      this._service.addPost(newPost).subscribe(() => {
        this.getPosts();
        document.getElementById('modulecloseBtn')?.click()
      });
    } else {
      this._service.updatePost(newPost).subscribe((data) => {
        this.getPosts();
        document.getElementById('modulecloseBtn')?.click()
      })
    }
  }


  updatePost(post: any) {
    this.updateBtn = post === null ? true : false;
    if(post == null) {
      // add new data code here..
      this.myform.reset();
    } if(post){
      this.myform.patchValue({
        id:post.id,
        firstname:post.firstname,
        lastname:post.lastname,
        email:post.email,
        mobile:post.mobile,
      });
    }  
  }

  

  deletePost(id: number) {
    this._service.deletePost(id).subscribe(() => {
      this.getPosts();
    });
  }

}
