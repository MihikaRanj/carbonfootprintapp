import firebase from 'firebase';

export interface Vehicle {
  id: string;
  vehicleBrandName: string;
  milesDriven: number;
  milesPerGallon: number;
  vehicleMaintFlag: boolean;
  emissionsForVehicle: number;
}

export interface Basics {
    id: string;
    peopleInHome: string;
    zipCode: string;
    primaryHeatingSource: string;
  }

  export interface Waste {
    id: string;
    recycleCans: boolean;
    recyclePlastic: boolean;
    recycleGlass: boolean;
    recycleNewspaper: boolean;
    recycleMagazines: boolean;
    wasteEmissionBasedOnPeopleInHome: number;
    wasteEmissionsReductionAfterRecyclingCans: number;
    wasteEmissionsReductionAfterRecyclingPlastics: number;
    wasteEmissionsReductionAfterRecyclingGlass: number;
    wasteEmissionsReductionAfterRecyclingNewspaper: number;
    wasteEmissionsReductionAfterRecyclingMagazines: number;
    wasteEmissionsReductionAfterRecycling: number;
    wasteEmissionAfterRecycling: number;
  }

export function toVehicle(doc: firebase.firestore.DocumentSnapshot): Vehicle {
  return { id: doc.id, ...doc.data() } as Vehicle;
}

export function toBasics(doc: firebase.firestore.DocumentSnapshot): Basics {
    return { id: doc.id, ...doc.data() } as Basics;
  }

  export function toWaste(doc: firebase.firestore.DocumentSnapshot): Waste {
    return { id: doc.id, ...doc.data() } as Waste;
  }