'use strict';

describe('Controllers Tests ', function () {

    beforeEach(module('jhipsterApp'));

    describe('LoginController', function () {
        var $scope;


        beforeEach(inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('LoginController', {$scope: $scope});
        }));

        it('should set remember Me', function () {
            expect($scope.rememberMe).toBeTruthy();
        });
    });

    describe('PasswordController', function(){
       var $scope,
           PasswordService;

        beforeEach(inject(function($rootScope, $controller, Password) {
            $scope = $rootScope.$new();
            PasswordService = Password;
            $controller('PasswordController',{$scope:$scope, Password:PasswordService});
        }));

        it('should show error if passwords do not match', function(){
            //GIVEN
            $scope.password = 'password1';
            $scope.confirmPassword = 'password2';
            //WHEN
            $scope.changePassword();
            //THEN
            expect($scope.doNotMatch).toBe('ERROR');

        });
        it('should call Service and set OK on Success', function(){
            //GIVEN
            var pass = 'myPassword';
            $scope.password = pass;
            $scope.confirmPassword = pass;
            //SET SPY
            spyOn(PasswordService, 'save');

            //WHEN
            $scope.changePassword();

            //THEN
            expect(PasswordService.save).toHaveBeenCalled();
            expect(PasswordService.save.mostRecentCall.args[0]).toBe(pass);
            //SIMULATE SUCCESS CALLBACK CALL FROM SERVICE
            PasswordService.save.mostRecentCall.args[1]();
            expect($scope.error).toBeNull();
            expect($scope.success).toBe('OK');
        });
    });

    describe('SettingsController', function () {
        var $scope, AccountService;

        beforeEach(inject(function ($rootScope, $controller, Account) {
            $scope = $rootScope.$new();

            AccountService = Account;
            $controller('SettingsController',{$scope:$scope, resolvedAccount:AccountService, Account:AccountService});
        }));

        it('should save account', function () {
            //GIVEN
            $scope.settingsAccount = {firstName: "John", lastName: "Doe"};

            //SET SPY
            spyOn(AccountService, 'save');

            //WHEN
            $scope.save();

            //THEN
            expect(AccountService.save).toHaveBeenCalled();
            expect(AccountService.save.mostRecentCall.args[0]).toEqual({firstName: "John", lastName: "Doe"});

            //SIMULATE SUCCESS CALLBACK CALL FROM SERVICE
            AccountService.save.mostRecentCall.args[1]();
            expect($scope.error).toBeNull();
            expect($scope.success).toBe('OK');
        });
    });

    describe('SessionsController', function () {
        var $scope, SessionsService;

        beforeEach(inject(function ($rootScope, $controller, Sessions) {
            $scope = $rootScope.$new();

            SessionsService = Sessions;
            $controller('SessionsController',{$scope:$scope, resolvedSessions:SessionsService, Sessions:SessionsService});
        }));

        it('should invalidate session', function () {
            //GIVEN
            $scope.series = "123456789";

            //SET SPY
            spyOn(SessionsService, 'delete');

            //WHEN
            $scope.invalidate($scope.series);

            //THEN
            expect(SessionsService.delete).toHaveBeenCalled();
            expect(SessionsService.delete.mostRecentCall.args[0]).toEqual({series: "123456789"});

            //SIMULATE SUCCESS CALLBACK CALL FROM SERVICE
            SessionsService.delete.mostRecentCall.args[1]();
            expect($scope.error).toBeNull();
            expect($scope.success).toBe('OK');
        });
    });
});