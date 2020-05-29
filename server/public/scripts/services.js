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