import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {}

  getIssues() {
    return this.http.get(
      'http://localhost:3000/api/issues'
    );
  }
updateStatus(
  id: string,
  status: string
) {

  return this.http.put(

    `http://localhost:3000/api/issues/${id}`,

    {
      status
    }

  );

}

deleteIssue(
  id: string
) {

  return this.http.delete(

    `http://localhost:3000/api/issues/${id}`

  );

}

  createIssue(data: any) {
    return this.http.post(
      'http://localhost:3000/api/issues',
      data
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      'http://localhost:3000/api/auth/login',
      {
        email,
        password
      }
    );
  }

  register(data: any) {
    return this.http.post(
      'http://localhost:3000/api/auth/register',
      data
    );
  }

  voteComplaint(
  id: string
) {

  return this.http.put(

    `http://localhost:3000/api/issues/vote/${id}`,

    {}

  );

}

addComment(
  id: string,
  comment: any
) {

  return this.http.put(

    `http://localhost:3000/api/issues/comment/${id}`,

    comment

  );

}
unvoteComplaint(
  id: string,
  email: string
) {

  return this.http.put(

    `http://localhost:3000/api/issues/unvote/${id}`,

    {
      email
    }

  );

}

deleteComment(

  issueId: string,

  index: number

) {

  return this.http.delete(

    `http://localhost:3000/api/issues/comment/${issueId}/${index}`

  );

}

}