angular.module('myModule', [])
.controller('myController', function($scope,$http) {
	$scope.voucherDetails=[];
	$scope.addVoucher=function(){
		if($scope.debitAccount == undefined || $scope.debitAccount=="")
		{
			alert("Please Enter Debit Amount");
			return false;
		}
		if($scope.creditAccount == undefined || $scope.creditAccount=="")
		{
			alert("Please Enter Credit Amount");
			return false;
		}
		if($scope.voucherDescription == undefined || $scope.voucherDescription=="")
		{
			alert("Please Enter Voucher Description");
			return false;
		}
		if($scope.amount == undefined || $scope.amount=="")
		{
			alert("Please Enter Amount");
			return false;
		}
		var obj = {
          voucherDescription: $scope.voucherDescription,
		  debitAccount: $scope.debitAccount,
		  creditAccount: $scope.creditAccount,
		  amount: $scope.amount
        };
		
		$scope.voucherDetails.push(obj);
		alert("Voucher Added Successfully");
	}
	$scope.cancelVoucher=function(){
		$scope.voucherDescription="";
		$scope.debitAccount="";
		$scope.creditAccount="";
		$scope.amount="";
		$scope.voucherNumber="";
		$scope.voucherDate="";
		//alert("No Changes Made");
	}
	$scope.submitVoucher=function(){

		console.log("The Values are:"+$scope.voucherDescription)
		
		var voucherObj = {
			voucherDescription : $scope.voucherDescription,
			debitAccount : $scope.debitAccount,
			creditAccount : $scope.creditAccount,
			amount : $scope.amount,
			voucherDate : $scope.voucherDate,
			voucherNumber: $scope.voucherNumber	
		};


		var voucherSave = {
			method : 'POST',
			url    : 'http://localhost:9070/voucher/save',
			data   : voucherObj,
			headers: {
				'Access-Control-Allow-Origin': '*',                 
			}
		};

		$http(voucherSave).success(function(data,response,status){
			window.alert("Voucher Details Saved");
		}).error(function(data,response,status){
			console.log(status);
		});
	}
})
.directive('onlyAmounts', function () {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, element, attrs, ngModel) {
			if (!ngModel) return;
			ngModel.$parsers.unshift(function (inputValue) {
				var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' ' || (s === '.' || s === '-')); }).join('');
				ngModel.$viewValue = digits;
				ngModel.$render();
				return digits;
			});
		}
	};
})
.directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            if (!ngModel) return;
            ngModel.$parsers.unshift(function (inputValue) {
                var digits = inputValue.split('').filter(function (s) { return (!isNaN(s) && s != ' '); }).join('');
                ngModel.$viewValue = digits;
                ngModel.$render();
                return digits;
            });
        }
    };
})

	