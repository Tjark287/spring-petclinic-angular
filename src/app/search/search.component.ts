import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Owner} from '../owners/owner';
import {OwnerFilterServiceService} from '../Services/owner-filter-service.service';
import {Observable} from 'rxjs/index';
import {OwnerService} from '../owners/owner.service';
import {PetService} from '../pets/pet.service';
import {VisitService} from '../visits/visit.service';
import {Pet} from '../pets/pet';
import {Visit} from '../visits/visit';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm;
  control = new FormControl();
  streets: string[] = ['Besitzern', 'Tieren', 'Besuchen'];
  public ownerliste: Owner[];
  listOwner: Owner[];
  listPet: Pet[];
  listVisit: Visit[];
  // filteredStreets: Observable<string[]>;
  filteredStreets: Observable<Owner[]>;

  seasons: string[] = ['Besitzer', 'Tiere', 'Besuche'];
  viewMode = 'owner';

  constructor(private router: Router,
              private ownerlisteService: OwnerFilterServiceService,
              private ownerService: OwnerService,
              private petService: PetService,
              private visitService: VisitService
  ) { }

  ngOnInit(): void {
    // this.setFilterdBenutzerliste();
    // this.filteredStreets = this.control.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
     this.ownerService.getOwners().subscribe(
       data => {
         this.listOwner = data;
       }
     );
     this.petService.getPets().subscribe(
       petData => {
         this.listPet = petData;
       }
     );
     this.visitService.getVisits().subscribe(
       visitData => {
         this.listVisit = visitData;
       }
     );

  }

  async setFilterdBenutzerliste() {
    this.listOwner = await this.ownerlisteService.filterItems(this.searchTerm);
  }





  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public selectOwner() {

    console.log('Hello Owner' );
    this.viewMode = 'owner';
  }
  public selectPet() {

    console.log('Hello Pets' );
    this.viewMode = 'pet';
  }
  public selectVisit() {

    console.log('Hello Visits' );
    this.viewMode = 'visit';
  }
  public goToOwner(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }
  public goToPet(pet: Pet) {
    this.router.navigate(['/owners', pet.owner.id]);
  }
  public goToVisit(visit: Visit) {
    this.router.navigate(['/owners', visit.pet.owner.id]);
  }
}
