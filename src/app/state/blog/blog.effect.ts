import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Router } from '@angular/router';
import { loadblogadminaction, loadblogadmintostoreaction } from './blog.actions';
import { BlogState } from './blog.state';
import { Store } from '@ngrx/store';

@Injectable()
export class BlogsEffects {
  blogs:any;
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private candidatService: CandidatService,
    private store: Store<{blog: BlogState}>
    ) {}

    loadblogadminaction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadblogadminaction),
     exhaustMap((action)=>{
        return  this.dataServece.getBlogs()
        .pipe(
            map((data:any)=>{
                this.blogs = JSON.parse(data);
                this.blogs.map(blog=>blog.created_at = blog?.created_at.split('T')[0])
                return loadblogadmintostoreaction({payload: this.blogs});
            })
        )
     })
    )
  })
}