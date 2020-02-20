import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DataAnalysisComponent } from './components/pages/onestopsearch/data-analysis/data-analysis.component';
import { MatTableModule, MatSelectModule, MatListModule, MatIconModule, MatCardModule } from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GraphComponent } from './components/pages/networks/protein-network/graph.component';


// import { CytodemoComponent } from './cytodemo/cytodemo.component';
import { CytoscapeModule } from 'ngx-cytoscape';
// import { GraphComponent } from './go-network/protein-network/protein-network.component';
// import {NgCytoComponent} from './go-network/ng-cyto/ng-cyto.component';
//Firestore modules
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GlmolComponent } from './components/pages/tools/glmol/glmol.component';
import { ColorPathwayComponent } from './components/pages/tools/color-pathway/color-pathway.component';
import { IntroductionComponent } from './components/pages/introductions/introduction/introduction.component';
import { InvestigatorComponent } from './components/pages/introductions/investigator/investigator.component';
import { DetailviewComponent } from './detailview/detailview.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {MatTabsModule} from "@angular/material/tabs";
import {MatRadioModule} from "@angular/material/radio";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from '@angular/material/tooltip';
import { BlastComponent } from './components/pages/tools/blast/blast.component';
import { LmpddetailviewComponent } from './components/pages/datapages/lmpddetailview/lmpddetailview.component';
import { GoNetworkComponent } from './components/pages/networks/go-network/go-network.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { LmpdArapidopsisComponent } from './components/pages/datapages/lmpd-arapidopsis/lmpd-arapidopsis.component';
import { DatatableComponent } from './components/pages/datapages/datatable/datatable.component';
import { CameliaComponent } from './components/pages/datapages/camelia/camelia/camelia.component';
import { FattyacidComponent } from './components/pages/datapages/fattyacid/fattyacid.component';
import { UploadFilesComponent } from './components/pages/fileuploads/upload-files/upload-files.component';
import { UploadTaskComponent } from './components/pages/fileuploads/upload-task/upload-task.component';
import { FileviewComponent } from './components/pages/fileuploads/fileview/fileview.component';
import { LmpdCardComponent } from './components/pages/datapages/lmpd-card/lmpd-card.component';
import { SoybeanComponent } from './components/pages/datapages/soybean/soybean.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    LmpdArapidopsisComponent,
    HomepageComponent,
    DataAnalysisComponent,
    DatatableComponent,
    GlmolComponent,
    ColorPathwayComponent,
    CameliaComponent,
    FattyacidComponent,
    GraphComponent,
    IntroductionComponent,
    InvestigatorComponent,
    BlastComponent,
    DetailviewComponent,
    // CytodemoComponent,
    UploadFilesComponent,
    UploadTaskComponent,
    DropzoneDirective,
    FileviewComponent,
    LmpdCardComponent,
    LmpddetailviewComponent,
    GoNetworkComponent,
    LmpddetailviewComponent,
    SoybeanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'fatplant'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    CdkTableModule,
    HttpClientModule,
    FormsModule,
    CytoscapeModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatRadioModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
