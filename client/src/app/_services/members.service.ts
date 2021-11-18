import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';

// const httpOptions= {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer '+ JSON.parse(localStorage.getItem('user'))?.token
//   })
// }

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();

  // paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private http: HttpClient) {}

  getMembers(userParams: UserParams) {
    console.log(Object.values(userParams).join('-'));
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      this.baseUrl + 'users',
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }
  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }
        return paginatedResult;
      })
    );
  }

  // getMembers(page?: number, itemsPerPage?: number) {
  //   let params = new HttpParams();
  //   if (page !== null && itemsPerPage !== null) {
  //     params = params.append('pageNumber', page.toString());
  //     params = params.append('pageSize', itemsPerPage.toString());
  //   }

  //   return this.http
  //     .get<Member[]>(this.baseUrl + 'users', { observe: 'response', params })
  //     .pipe(
  //       map((response) => {
  //         this.paginatedResult.result = response.body;
  //         if (response.headers.get('Pagination') !== null) {
  //           this.paginatedResult.pagination = JSON.parse(
  //             response.headers.get('Pagination')
  //           );
  //         }

  //         return this.paginatedResult;
  //       })
  //     );
  // }
  // getMembers(userParams: UserParams) {
  //   var response = this.memberCache.get(Object.values(userParams).join('-'));
  //   if (response) {
  //     return of(response);
  //   }

  //   let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

  //   params = params.append('minAge', userParams.minAge.toString());
  //   params = params.append('maxAge', userParams.maxAge.toString());
  //   params = params.append('gender', userParams.gender);
  //   params = params.append('orderBy', userParams.orderBy);

  //   return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
  //     .pipe(map(response => {
  //       this.memberCache.set(Object.values(userParams).join('-'), response);
  //       return response;
  //     }))
  // }
  getMember(username: string) {
    // return this.http.get<Member>(this.baseUrl + 'users/' + username);
    const member = this.members.find((x) => x.username === username);
    if (member !== undefined) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  updateMember(member: Member) {
    // return this.http.put(this.baseUrl + 'users', member);
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }
}
