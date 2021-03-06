'use strict';

angular.module('main').service('AuthService', function($q, GroupSession, localStorageService, Session, $rootScope, $ionicHistory, $firebaseAuth, $firebaseObject){
  var ref = firebase.database().ref();
  var firebaseAuth = $firebaseAuth();
  var self = this;

  function onSuccessfulLogin (user) {
    Session.create(user);
    $rootScope.isLoggedIn = true;
    return user;
  }

  function addUser (userId, name, email, phone, photoUrl) {

    ref.child('users/' + userId).set({
      name: name,
      email: email,
      phone: phone,
      photoUrl: photoUrl,
      uid: userId
    });
  }

  this.checkPassword = function (email, password){
    return firebaseAuth.$signInWithEmailAndPassword(email, password)
    .then(function(res){
      return 'Success!';
    });
  };

  this.getUser = function (id){
    var user = $q.defer();

    ref.child('users/' + id).on('value', function(snapshot){
      user.resolve(snapshot.val());
    }, function(error){
      user.reject(error.code);
    });

    return user.promise;
  };

  this.isAuthenticated = function(){
    return !!Session.profile;
  };

  this.changeEmail = function(newEmail){
    return firebase.auth().currentUser.updateEmail(newEmail)
    .then(function(){
      return 'Success!';
    });
  };

  this.changePassword = function(newPassword){
    return firebase.auth().currentUser.updatePassword(newPassword)
    .then(function(){
      return 'Success!';
    });
  };

  this.getLoggedInUser = function(fromServer){
    // pass in true for fromServer, which is an optional parameter if you need a server ping for user
    if(this.isAuthenticated() && fromServer !== true){
      return $q.when(Session.profile);
    }


    var firebaseProfile = $firebaseObject(ref.child('users/' + Session.profile.uid));
    onSuccessfulLogin(firebaseProfile);
    return $q.when(firebaseProfile);

  };

  this.login = function (email, password){
    var uid;
    return firebaseAuth.$signInWithEmailAndPassword(email, password)
    .then(function (authUser){
      uid = authUser.uid;
      return self.getUser(authUser.uid);
    })
    .then(function (dbUser){
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      localStorageService.set('email', email);
      localStorageService.set('password', password);
      var firebaseProfile = $firebaseObject(ref.child('users/' + uid));
      return onSuccessfulLogin(firebaseProfile);
    });
  };

  this.signup = function (userInfo){
    return firebaseAuth.$createUserWithEmailAndPassword(userInfo.email, userInfo.password)
    .then(function (authUser){
      return addUser(authUser.uid, userInfo.name, authUser.email, userInfo.phone, "http://www.rogerbrayrestoration.com/wp-content/uploads/2014/08/Blank-Profile.jpg");
    })
    .then(function (){
      return self.login(userInfo.email, userInfo.password);
    });
  };

  this.logout = function () {
    $rootScope.isLoggedIn = false;
    Session.destroy();
    GroupSession.destroy();
    localStorageService.clearAll();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
  };
})
.run(function(localStorageService, AuthService, $state, $ionicHistory){
  var email = localStorageService.get('email');
  var password = localStorageService.get('password');
  if(email && password){
    AuthService.login(email, password)
    .then(function(res){
      $ionicHistory.clearHistory();
      $state.go('tab.camera')
    });
  }
});

