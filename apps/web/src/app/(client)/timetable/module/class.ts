import { STATION } from "./formTypes";

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

export class CandidatesStation {
  private _depart: STATION[];
  private _arrive: STATION[];
  private _compareResult:
    | { index: number; depart: STATION; arrive: STATION }[]
    | null = null;

  constructor(depart: STATION[], arrive: STATION[]) {
    this._depart = depart;
    this._arrive = arrive;
  }

  get depart(): STATION[] {
    return this._depart;
  }

  get arrive(): STATION[] {
    return this._arrive;
  }

  get compareResult():
    | { index: number; depart: STATION; arrive: STATION }[]
    | null {
    return this._compareResult;
  }

  set depart(depart: STATION[]) {
    this._depart = depart;
  }

  set arrive(arrive: STATION[]) {
    this._arrive = arrive;
  }
  /// 出発と到着データを時刻順にソートする(DB内のデータがソートされているとは限らないので)
  sort(): this {
    this._depart.sort((a, b) => {
      const aTime = Number(a.hour) * 100 + Number(a.minute);
      const bTime = Number(b.hour) * 100 + Number(b.minute);
      return aTime - bTime;
    });
    this._arrive.sort((a, b) => {
      const aTime = Number(a.hour) * 100 + Number(a.minute);
      const bTime = Number(b.hour) * 100 + Number(b.minute);
      return aTime - bTime;
    });
    return this;
  }

  /// 出発と到着データについて、時刻を比較して比較結果を_compareResultに保存する
  compare(): this {
    this._compareResult = [];
    let index: number = 0;

    for (const depart of this._depart) {
      for (const arrive of this._arrive) {
        /// 日付/方向が異なる場合はスキップ
        if (depart.day !== arrive.day || depart.direction !== arrive.direction)
          continue;

        const departTime = Number(depart.hour) * 100 + Number(depart.minute);
        const arriveTime = Number(arrive.hour) * 100 + Number(arrive.minute);
        /// 出発時刻が到着時刻よりも早い場合は比較結果に追加
        if (departTime <= arriveTime) {
          this._compareResult.push({ index, depart, arrive });
          index = index + 1;
          /// 以降の到着時刻との比較は不要なのでbreak
          break;
        }
      }
    }
    /// 比較結果を_compareResultに保存した後、thisを返す
    return this;
  }
}
