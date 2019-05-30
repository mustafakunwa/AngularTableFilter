import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { FormControl } from '@angular/forms';
import {ListColumn} from '../app/ModelClass';
import {ServiceService} from '../app/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Records:ListColumn[];

  displayedColumns: string[] = ['Time', 'Side', 'OrderType', 'CcyPair','Price','Amount','Status'];
  dataSource = new MatTableDataSource(this.Records);
  
  @ViewChild(MatSort) sort: MatSort;
  CcypairFilter = new FormControl();
  statusFilter = new FormControl();

  private filterValues = { ccyPair: ' ', status: ' ' }

  constructor(
    private ServiceService: ServiceService
  ) {}

  
  ngOnInit() {
    var promise=this.ServiceService.GetListBlotter().subscribe(
      _list=>{
          this.Records=_list;
          this.dataSource = new MatTableDataSource(this.Records);
          this.dataSource.sort = this.sort;
      },
      error=>{alert(error.error);}
    )
    
    this.dataSource.sort = this.sort;

    this.CcypairFilter.valueChanges
    .subscribe(value => {
      this.dataSource.filterPredicate = this.createFilter();
      this.filterValues['ccyPair'] = value
      this.dataSource.filter = JSON.stringify(this.filterValues)
      
    });

    this.statusFilter.valueChanges
    .subscribe(value => {
      this.dataSource.filterPredicate = this.createFilter();
      this.filterValues['status'] = value
      this.dataSource.filter = JSON.stringify(this.filterValues)
    });
    
  }

  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter)
      let CcPairSearch = () => {
        let found = false;
        searchTerms.ccyPair.trim().toLowerCase().split(' ').forEach(word => {
          if (data.CcyPair.toLowerCase().indexOf(word) != -1) { found = true }
        });
        return found
      }

      let StatusSearch = () => {
        let found = false;
        searchTerms.status.trim().toLowerCase().split(' ').forEach(word => {
          if (data.Status.toLowerCase().indexOf(word) != -1) { found = true }
        });
        return found
      }

      return CcPairSearch() && StatusSearch()
      
    }
    return filterFunction
  }


}
