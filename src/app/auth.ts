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
      'https://cleanstreet-backend.onrender.com/api/issues'
    );
  }
updateStatus(
  id: string,
  status: string
) {

  return this.http.put(

    `https://cleanstreet-backend.onrender.com/api/issues/${id}`,

    {
      status
    }

  );

}

deleteIssue(
  id: string
) {

  return this.http.delete(

    `https://cleanstreet-backend.onrender.com/api/issues/${id}`

  );

}

  createIssue(data: any) {
    return this.http.post(
      'https://cleanstreet-backend.onrender.com/api/issues',
      data
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      'https://cleanstreet-backend.onrender.com/api/auth/login',
      {
        email,
        password
      }
    );
  }

  register(data: any) {
    return this.http.post(
      'https://cleanstreet-backend.onrender.com/api/auth/register',
      data
    );
  }

  voteComplaint(
  id: string
) {

  return this.http.put(

    `https://cleanstreet-backend.onrender.com/api/issues/vote/${id}`,

    {}

  );

}

addComment(
  id: string,
  comment: any
) {

  return this.http.put(

    `https://cleanstreet-backend.onrender.com/api/issues/comment/${id}`,

    comment

  );

}
unvoteComplaint(
  id: string,
  email: string
) {

  return this.http.put(

    `https://cleanstreet-backend.onrender.com/api/issues/unvote/${id}`,

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

    `https://cleanstreet-backend.onrender.com/api/issues/comment/${issueId}/${index}`

  );

}

}