export const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const scopes = {
  read: ['api://e1c9d413-0fcf-4526-a24d-ec4a451b37b4/read_write'],
  write: ['api://e1c9d413-0fcf-4526-a24d-ec4a451b37b4/read_write'],
};

export const authRequestScopes = ['user.read'];

export const protectedResourceScopes = [
  {
    httpMethod: 'GET',
    scopes: [...scopes.read],
  },
  {
    httpMethod: 'POST',
    scopes: [...scopes.write],
  },
  {
    httpMethod: 'PUT',
    scopes: [...scopes.write],
  },
  {
    httpMethod: 'DELETE',
    scopes: [...scopes.write],
  },
  {
    httpMethod: 'PATCH',
    scopes: [...scopes.write],
  },
];
