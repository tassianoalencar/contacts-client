import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts: any = [];
  contact: any;
  currentContact = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [3, 6, 9];

  constructor(
    private service: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.retrieveContacts();
    this.resetForm();
  }

  retrieveContacts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.service.getAll(params)
      .subscribe(
        response => {
          const { content, totalElements } = response;
          this.contacts = content;
          this.count = totalElements;
        },
        error => {
          console.log(error);
        });
  }

  getRequestParams(searchTitle, page, pageSize): any {
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event): void {
    this.page = event;
    this.retrieveContacts();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveContacts();
  }

  refreshList(): void {
    this.retrieveContacts();
    this.currentContact = undefined;
    this.currentIndex = -1;
  }

  editContact(id) {
    this.service.get(id)
    .subscribe(
      response => {
        this.contact = response;
      },
      error => {
        console.log(error);
      });
  }

  deleteContact(id) {
    this.service.delete(id)
      .subscribe(
        response => {
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(): void {
    if (this.contact.id == null) {
      this.createContact();
    } else {
      this.updateContact();
    }

  }

  createContact() {
    this.service.create(this.contact).subscribe(result => {
      this.resetForm();
      this.refreshList();
    });
  }

  updateContact() {
    this.service.update(this.contact.id, this.contact).subscribe(result => {
      this.refreshList();
      this.resetForm();
    });
  }

  resetForm(): void {
    this.contact = {};
  }
}
