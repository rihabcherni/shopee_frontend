import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  profileForm!: FormGroup;
  defaultImage = 'assets/seller1.png';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Initialize the form with default values or values from your backend
    this.profileForm = this.formBuilder.group({
      name: ['Mejri Aymen', Validators.required],
      email: ['aymenmejri@yahoo.com', [Validators.required, Validators.email]],
      phoneNumber: ['23052740', Validators.required],
      image: ['assets/seller1.png'] 
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      console.log('Updated Profile:', this.profileForm.value);
    } else {
      console.log('Form validation error');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.profileForm.patchValue({
      image: file ? URL.createObjectURL(file) : ''
    });
  }

  setDefaultImage() {
    // If the image fails to load or is not provided, set a default image
    this.profileForm.patchValue({
      image: this.defaultImage
    });
  }

}
