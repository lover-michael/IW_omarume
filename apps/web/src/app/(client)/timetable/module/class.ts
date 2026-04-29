export class UserStationGroup {
  private _depart: string | null;
  private _arrive: string | null;

  constructor(depart: string | null, arrive: string | null) {
    this._depart = depart;
    this._arrive = arrive;
  }

  get depart(): string | null {
    return this._depart;
  }

  get arrive(): string | null {
    return this._arrive;
  }

  set depart(depart: string | null) {
    this._depart = depart;
  }

  set arrive(arrive: string | null) {
    this._arrive = arrive;
  }
}
