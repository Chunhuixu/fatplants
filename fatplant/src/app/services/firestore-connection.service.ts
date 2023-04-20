import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirestoreConnectionService {

  constructor(private afs: AngularFirestore, private http: HttpClient) { }

  connect(collectionName:string){
    return this.afs.collection(collectionName,ref=>ref.limit(100)).valueChanges();
  }

  getRows(collectionName:string, field: string) {
    return this.afs.collection(collectionName, ref => ref.limit(50)).valueChanges();
  }

  nextPage(collectionName:string, last, field: string) {
    return this.afs.collection(collectionName, ref => ref.orderBy(field).startAfter(last[field]).limit(10)).valueChanges();
  }

  prevPage(collectionName:string, first, field: string) {
    return this.afs.collection(collectionName, ref => ref.orderBy(field).endBefore(first[field]).limit(10)).valueChanges();
  }

  searchItems(collectionName: string, field:string, query:string) {
    return this.afs.collection(collectionName, ref => ref.limit(10).where(field, '>=', query).where(field, '<=', query + '\uf8ff')).valueChanges();
  }

  getNews() {
    return this.afs.collection('News').get();
  }

  searchSQLAPI(query: string, species: string) {
    return this.http.get("https://fatplantsmu.ddns.net:5000/get_species_records/?species="+ species +"&expression=" + query);
  }

  getDataSetSamples(species: string) {
    return this.http.get("https://fatplantsmu.ddns.net:5000/sample/?species="+species)
  }

  searchFattyAcid(query: string) {
    return this.http.get("https://fatplantsmu.ddns.net:5000/fatty_acid_search/?query=" + query);
  }
}
