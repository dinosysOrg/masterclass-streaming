angular.module('streaming', ['ngFileUpload'])
  .controller('mainController', function($scope, $http, Upload) {
    $scope.apikey = '';
    if (localStorage.getItem('user')) {
      $scope.apikey = JSON.parse(localStorage.getItem('user')).apikey;
    }

    $scope.user = {
      email: '',
    };

    let getListVideo = () => {
      $http.get('/api/videos').then(function(response) {
        $scope.videos = response.data;
      }).catch(function(err) {
        $scope.error = err;
      });
    };

    getListVideo();

    $scope.getApiKey = function() {
      $http({
        method: 'POST',
        url: '/api/newApiKey',
        data: $scope.user,
        headers: {
          secretkey: 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr',
        },
      }).then(function(response) {
        $scope.apikey = response.data.apikey;
        localStorage.setItem('user', JSON.stringify({
          email: $scope.user.email,
          apikey: $scope.apikey,
        }));
      }).catch(function(err) {
        $scope.error = err;
      });
    };

    $scope.upload = function(file) {
      $scope.percent = 0;
      Upload.upload({
        url: '/api/upload',
        data: {file: file},
        headers: JSON.parse(localStorage.getItem('user')),
      }).then(function(resp) {
        $scope.videoFile = null;
        getListVideo();
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        let progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.percent = progressPercentage;
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  });
