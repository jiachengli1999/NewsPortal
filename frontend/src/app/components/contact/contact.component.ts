import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MailService } from 'src/app/shared/services/mailService/mail.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: any;

  isSaved = false;


  constructor(private fb: FormBuilder, private serv:MailService) {
    this.contactForm = this.fb.group({

      // have the input element equivalent on the ts side
      name: new FormControl('', Validators.required), // step #5: form validation
      email: new FormControl('', [Validators.required, Validators.email]),
      msg: new FormControl('',  [Validators.required, Validators.minLength(10)]),
    }
    );
    
   }

  ngOnInit(): void {
      
  }

  handleContactForm() {
    let contact={name:this.contactForm.value['name'],
            email:this.contactForm.value['email'],
            msg:this.contactForm.value['msg']}
    //window.location.href = 'http://localhost:3000/sendmail';
    this.serv.sendMail(contact);
    // send above data to the service
    // get the res from the service
    // upon getting successful status display the 
    this.isSaved = true;
  }
}
