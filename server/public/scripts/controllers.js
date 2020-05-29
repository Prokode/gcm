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



    // MySocket.on('clock_refresh', function (data) { 
    //   console.log(data);
    //   if ($scope.postes.length) {
    //     $scope.postes.forEach(poste => {
    //       if (poste.poste._id === data.poste._id) {
    //         poste.time = data.time;
    //         poste.tarif = data.tarif;
    //       }
    //     });
    //   }
    // });
  
    // MySocket.on('clock_end', function (data) { 
    //   if ($scope.postes.length) {
    //     $scope.postes.forEach((poste, index) => {
    //       if (poste.poste._id === data.poste._id) {
    //         poste.time = null;
    //         poste.tarif = null;
    //       }
    //     });
    //   }  
    // });
  
  });