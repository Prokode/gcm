var error = function(error) {
    console.log(error);
};
app.service('MainService', function($http) {
    return {
        getPostes: function() {
            return $http.get('http://localhost:8080/web/vente/poste/tarifs/list')
                .then(function (response) {
                    return response.data;
                },  error(error))
        }
}});

app.service('AuthService', function($http, $q) {
    const gcmUser = window.localStorage.getItem('gcmUser');
    let gcmUserParsed = null;
    if (gcmUser != null && gcmUser != "") {
        gcmUserParsed = JSON.parse(gcmUser);
    }
    return {
        user: gcmUserParsed != null ? gcmUserParsed : {
            name: "",
            role: "",
            token: ""
        },
        login: function(user) {
            return $http.post('http://localhost:8080/auth/signin', user)
                .then(function (response) {
                    return response.data;
                },  error(error))
        },
        authenticate: function() {
            if( this.user.token != null && this.user.token != "") {
                //If authenticated, return anything you want, probably a user object
                return true;
            } else {
                //Else send a rejection
                return $q.reject('Not Authenticated');
            }
        },
        notAuthenticate: function() {
            if( this.user.token != null && this.user.token != "") {
                //If authenticated, return anything you want, probably a user object
                return $q.reject('Authenticated');
            } else {
                //Else send a rejection
                return true
            }
        },
}});

app.service('AdminService', function($http) {
    return {
        getPostesTarifs: function() {
            return $http.get('http://localhost:8080/logged/poste/list/tarifs')
                .then(function (response) {
                    return response.data;
                },  error(error))
        },
        getBoards: function() {
            return $http.get('http://localhost:8080/logged/board/list')
                .then(function (response) {
                    return response.data;
                },  error(error))
        },
}});

// app.service('MainService', function($http) {
//     return {
//         getPostes: function() {
//             return $http.get('http://localhost:8080/web/vente/poste/tarifs/list')
//                 .then(function (response) {
//                     return response.data;
//                 },  error(error))
//         }
// }});