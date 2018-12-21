import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Job } from "../../model/job";
import firebase from "firebase";

@Injectable()
export class JobProvider {
  private PATH = "jobs/";
  constructor(private db: AngularFireDatabase) {}

  save(job: Job) {
    return new Promise((resolve, reject) => {
      if (job.key) {
        this.db
          .list(this.PATH + job.key)
          .update(job.key, job)
          .then((result: any) => resolve(job.key))
          .catch(e => reject(e));
      } else {
        job.dateCreated = firebase.database.ServerValue.TIMESTAMP;

        this.db
          .list(this.PATH)
          .push(job)
          .then((result: any) => resolve(result.key));
      }
    });
  }

  getAll(companyKey: string) {
    return this.db
      .list(this.PATH, ref =>
        ref.orderByChild("companyKey").equalTo(companyKey)
      )
      .snapshotChanges()
      .map(changes => {
        return changes.map(e => ({ key: e.key, ...e.payload.val() }));
      });
  }

  delete(key: string) {
    return this.db.object(this.PATH + key).remove();
  }
}
