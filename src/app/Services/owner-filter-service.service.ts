import { Injectable } from '@angular/core';
import {OwnerService} from '../owners/owner.service';
import {Owner} from '../owners/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerFilterServiceService {
  public ownerListe: any = [];

  constructor(
    private ownerService: OwnerService
  ) {
    this.ownerListe = [

      this.ownerService.getOwners().subscribe(
        data => {
          this.ownerListe = data;
        }
      )
      // ownerService.getOwners().subscribe(ownerliste =>
      // this.ownerListe = ownerliste),
      // console.log('Log from OwnerFilterService' + '' + this.ownerListe),
      // console.log('Show Owner: ' + this.ownerListe + JSON.stringify(this.ownerListe.firstName))
    ];
  }

  filterItems(searchTerm) {
    return this.ownerListe.filter(item => {
      return item.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getOwner() {
    return this.ownerListe;
  }

}
