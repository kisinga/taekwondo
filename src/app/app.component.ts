import {Component} from '@angular/core';
import {CommonService} from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private newService: CommonService,) {
  }

  Repdata;
  valbutton = 'Save';


  ngOnInit() {
    this.newService.GetUser().subscribe(data => this.Repdata = data);
  }

  onSave = function (user, isValid: boolean) {
    user.mode = this.valbutton;
    this.newService.saveUser(user)
      .subscribe(data => {
          alert(data.data);

          this.ngOnInit();
        }
        , error => this.errorMessage = error);

  };
  edit = function (kk) {
    this.id = kk._id;
    this.name = kk.name;
    this.address = kk.address;
    this.valbutton = 'Update';
  };

  delete = function (id) {
    this.newService.deleteUser(id)
      .subscribe(data => {
        alert(data.data);
        this.ngOnInit();
      }, error => this.errorMessage = error);
  };

}
