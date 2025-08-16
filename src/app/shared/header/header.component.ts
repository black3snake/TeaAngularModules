import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchService} from "../services/search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // searchQuery = ''
  constructor(private fb: FormBuilder, private searchService: SearchService,
              private router: Router) {
  }

  searchForm = this.fb.group({
    searchQuery: ['']
  })

  get searchQuery() {
    return this.searchForm.get('searchQuery');
  }

  onSubmit() {
    const query = this.searchQuery?.value || '';
    if (query !== null || query !== '') {
      this.searchService.searching(query.trim())
        .subscribe(() => {
          this.router.navigate(['/products'], {queryParams: {search: query}});
        });
    }
  }

  clearS() {
    this.searchService.clearSearch();
    this.searchForm.reset();
  }
}
