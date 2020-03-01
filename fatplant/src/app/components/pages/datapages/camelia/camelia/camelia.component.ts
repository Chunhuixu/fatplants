import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';


import { FirestoreConnectionService } from 'src/app/services/firestore-connection.service';
import { FatPlantDataSource } from 'src/app/interfaces/FatPlantDataSource';

@Component({
  selector: 'app-camelia',
  templateUrl: './camelia.component.html',
  styleUrls: ['./camelia.component.css']
})
export class CameliaComponent implements OnInit {

  displayedColumns = ['camelina','aralip_pathways','ath_description','no','homeologs'];
  dataSource:MatTableDataSource<any>;
  dayInMillis = 86400000;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // columns=[{columnDef: 'aralip_pathways',header:'Aralip Pathways',cell:(element:any)=>element.Aralip_Pathways},
  //       {columnDef: 'ath_description',header:'Ath Description',cell:(element:any)=>element.Ath_description},
  //       {columnDef: 'camelina',header:'Camelina',cell:(element:any)=>element.Camelina},
  //       {columnDef: 'no',header:'No',cell:(element:any)=>element.No},
  //      {columnDef: 'homeologs',header:'Homeologs',cell:(element:any)=>element.Homeologs}]
  // docs;
  constructor(private db:FirestoreConnectionService) {
    var localCamelinaData: FatPlantDataSource = JSON.parse(localStorage.getItem('camelina_data'));
    if (localCamelinaData != null && (Date.now() - localCamelinaData.retrievalDate <= this.dayInMillis)) {
      this.dataSource = new MatTableDataSource(localCamelinaData.data);
      this.dataSource.paginator = this.paginator;
    }
    else {
      let docs=this.db.connect('Camelina').subscribe(data =>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator;
        let localCamelinaData: FatPlantDataSource = {
          retrievalDate: Date.now(),
          data: data
        };
        localStorage.setItem('camelina_data', JSON.stringify(localCamelinaData));
      });
    }
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim();
  filterValue = filterValue.toLowerCase();
  this.dataSource.filter = filterValue;
}

  ngOnInit() {
  }

}
