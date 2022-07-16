import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  languages = [];
  model = new Employee('', '', true, "w2", "default");
  hasPrimaryLanguageError = false;
  startDate: Date;

  constructor(private formPoster: FormPoster) { }

  ngOnInit(): void {
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        error => console.log("error: ", error)
      );
  }

  submitForm(form: NgForm) {
    this.validatePrimaryLanguage(form.value.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return;

    this.formPoster.postEmpoyeeForm(form.value)
      .subscribe(
        data => console.log("success: ", data),
        error => console.log("error: ", error)
      );
  }

  validatePrimaryLanguage(event) {
    if (this.model.primaryLanguage === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }

  firstNameToUpperCase(value: string) {
    if (value.length > 0)
      this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
      this.model.firstName = value;
  }
}
