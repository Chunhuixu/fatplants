import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {
  public items: any;

  private blast: string;
  private isVisibale: boolean;
  private result: string;
  private isBlastP: boolean;
  private isBlastN: boolean;
  private isGlmol: boolean;
  private glmolUrl: string;
  private blastRes = [];
  blastForm: FormGroup;
  constructor(private http: HttpClient, private router: Router, db: AngularFirestore) {
    // this.blastForm = fb.group({method: ['', Validators.required]});
    this.blastForm = new FormGroup({
      fasta : new FormControl(),
      method : new FormControl(),
      ProteinDatabase : new FormControl(),
      Ethreshold : new FormControl(),
      maxhit : new FormControl(),
      NucleotideDatabase : new FormControl()
    });
    this.isVisibale = true;
    this.isBlastP = false;
    this.isBlastN = false;
    this.isGlmol = false;
    this.items = db.collection('/Lmpd_Arapidopsis').valueChanges();
  }
  onSubmit(blastData) {
    console.log(blastData);
    // console.log(this.http.get('linux-shell-test.appspot.com'));
    // this.router.navigateByUrl('/app-data-analysis');
    // this.http.get('/test?q=Glyma14g08610.1').subscribe((res: Response) => {console.log(res); });
    // this.http.get('/ng/index').subscribe((res: Response) => {console.log(res); });
    // this.http.post('/blastp', blastData).subscribe((res: Response) => {console.log(res); });
    this.http.post('/test', blastData, {responseType: 'text'}).subscribe((res: any) => {
      // this.result = res.result;
      // console.log(res.result);
      // this.ShowResult(res.result);
      this.result = res;
      // console.log(res);
      this.ShowResult(res);
      this.SplitRes(res);
      // this.router.navigateByUrl('/result');
    });
  }
  ngOnInit() {
    // this.blastForm = new FormGroup({});
    this.blast = 'input blast here';

  }
  debug() {
    // console.log(msg);
    const options: string [] = [];
    // this.childProcessService.childProcess.exec("python",options,(data) => {console.log(data);});

  }
  SelectBlastP() {
    this.isBlastP = true;
    this.isBlastN = false;
    // console.log("select p");
  }
  SelectBlastN() {
    this.isBlastN = true;
    this.isBlastP = false;
    // console.log("select n");
  }
  ShowResult(result: string) {
    // const newWindow = window.open('Result', '_blank');
    // newWindow.document.write('<p style="white-space: pre-wrap">' + result + '</p>');
    const newWindow = window.open('Result', '_blank');
    newWindow.document.write('<pre>' + result + '</pre>');
  }
  showGlmol() {
    const newWindow = window.open('Result', '_blank');
    // console.log(this.glmolUrl);
    let tmp: string;
    tmp = this.glmolUrl;
    tmp = tmp.replace('.', '_');
    let url = 'http://soykb.org/search/glmol/viewer.html?' + tmp + '.pdb'
    // this.glmolUrl = '"http://soykb.org/search/glmol/viewer.html?Glyma14g08610_1.pdb"';
    newWindow.document.write('<iframe src="' + url + '" style="width: 100%" height="768"></iframe>');
    // this.isGlmol = true;
  }
  SplitRes(result: string) {
    this.blastRes = []
    let tmp: any;
    // tmp = result.match(/>[\s\S]+Lambda/g)
    tmp = result.split('>');
    tmp.shift();
    let index: number;
    index = tmp[tmp.length - 1].search('Lambda');
    tmp[tmp.length - 1] = tmp[tmp.length - 1].substring(0, index);
    // console.log(tmp);
    // let x: any;
    // let t: any;
    // for (x in tmp) {
    //   t = tmp[x].split('\n');
    //   console.log(t);
    //   this.blastRes.push({
    //     title: t[0],
    //     content: t[1]
    //   });
    // }
    this.blastRes = tmp;
  }
}
