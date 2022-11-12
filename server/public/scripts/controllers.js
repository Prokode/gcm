app.controller('HomeCtrl',  function($scope, MainService, MySocket) {
    console.log('Home Controller');
    $scope.postes = [];
    $scope.loading = true;
    $scope.getPostes = function() {
      $scope.loading = true;
        MainService.getPostes().then(function(postes) {
            $scope.postes = postes.map(
              (poste) => {
                return {
                  poste: poste.poste,
                  console: poste.console,
                  tarifs: poste.tarifs,
                  tarif: null,
                  time: null,
                  isOn: false,
                  timems: null
                }
              }
            );
            $scope.loading = false;
        });
    }
  
    $scope.getPostes();

    $scope.getEndSignal = function(poste) {
        if(!poste.timems) {
          return false;
        } else if (Number(poste.timems) <= (120000)) {
          return true;
        }
    }

    MySocket.on('broadcast', function(data) {
        if (data.message === 'clock_refresh') {
            $scope.postes.forEach(poste => {
              if (poste.poste._id === data.poste._id) {
                poste.time = data.time;
                poste.tarif = data.tarif;
                poste.timems = data.timems;
              }
            });
          } else if (data.message === 'clock_end') {
            $scope.postes.forEach((poste, index) => {
              if (poste.poste._id === data.poste._id) {
                poste.time = null;
                poste.tarif = null;
                poste.timems = null;
              }
            });
          }
    });
  
});


app.controller('LoginCtrl',  function($scope, AuthService, $location, auth) {
  console.log('Login Controller');
  console.log(auth);

  $scope.user = {
    username: "",
    password: ""
  }

  $scope.loading = false;

  $scope.login = function() {
    $scope.loading = true;
    console.log($scope.user);
    AuthService.login($scope.user).then(function(data) {
      console.log(data);
      AuthService.user = {
        name:  $scope.user.username,
        role: data?.role,
        token: data?.token
      }
      const gcmUser = window.localStorage.getItem('gcmUser');
      if (gcmUser) {
        window.localStorage.removeItem('gcmUser');
      }
      window.localStorage.setItem('gcmUser', JSON.stringify(AuthService.user));
      $scope.loading = false;
      $location.path('/admin');
    }, function(err) {
      console.log(err);
      if (err != null) {
        alert(err?.data?.message);
      }
      $scope.loading = false;
    });
  }

});  

app.controller('AdminCtrl',  function($scope, AuthService, AdminService, postes, boards, MySocket) {
  console.log('Admin Controller');
  console.log(postes);
  console.log(boards);
  let temp = [];
  $scope.postes = [];
  $scope.user = AuthService.user;
  if (postes != null) {
    $scope.postes = postes.map(
      (poste) => {
        return {
          poste: poste.poste,
          console: poste.console,
          tarifs: poste.tarifs,
          tarif: null,
          time: null,
          isOn: false,
          timems: null, 
          vente: null
        }
      }
    );
    temp = $scope.postes;
  }

  $scope.logout = function() {
    console.log("Log out");
  }
  
});