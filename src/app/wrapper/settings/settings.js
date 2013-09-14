//---------------------------------------------------------
// Module Initialization
//---------------------------------------------------------
angular.module
(
	'adrrApp.wrapper.settings', []
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Module Configurations
//---------------------------------------------------------
.config
(
	function config ($stateProvider)
	{
		$stateProvider.state
		(
			'wrapper.settings',
			{
				abstract: true,
				views:
				{
					"@wrapper":
					{
						templateUrl: 'wrapper/settings/settings.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pouringType',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'PouringTypeCtrl',
						templateUrl: 'wrapper/settings/pouringType.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pouringType.create',
			{
				url: '^/settings/pouring-type/create',
				views:
				{
					"@wrapper.settings.pouringType":
					{
						templateUrl: 'wrapper/settings/pouringTypeForm.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pouringType.update',
			{
				url: '^/settings/pouring-type/update/:id',
				views:
				{
					"@wrapper.settings.pouringType":
					{
						templateUrl: 'wrapper/settings/pouringTypeForm.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.concreteType',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'ConcreteTypeCtrl',
						templateUrl: 'wrapper/settings/concreteType.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.concreteType.create',
			{
				url: '^/settings/concrete-type/create',
				views:
				{
					"@wrapper.settings.concreteType":
					{
						templateUrl: 'wrapper/settings/concreteTypeForm.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.concreteType.update',
			{
				url: '^/settings/concrete-type/update/:id',
				views:
				{
					"@wrapper.settings.concreteType":
					{
						templateUrl: 'wrapper/settings/concreteTypeForm.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.zone',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'ZoneCtrl',
						templateUrl: 'wrapper/settings/zone.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.zone.create',
			{
				url: '^/settings/zone/create',
				views:
				{
					"@wrapper.settings.zone":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.zone.update',
			{
				url: '^/settings/zone/update/:id',
				views:
				{
					"@wrapper.settings.zone":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.supplier',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'SupplierCtrl',
						templateUrl: 'wrapper/settings/supplier.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.supplier.create',
			{
				url: '^/settings/supplier/create',
				views:
				{
					"@wrapper.settings.supplier":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.supplier.update',
			{
				url: '^/settings/supplier/update/:id',
				views:
				{
					"@wrapper.settings.supplier":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftType',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'ShiftTypeCtrl',
						templateUrl: 'wrapper/settings/shiftType.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftType.create',
			{
				url: '^/settings/shift-type/create',
				views:
				{
					"@wrapper.settings.shiftType":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftType.update',
			{
				url: '^/settings/shift-type/update/:id',
				views:
				{
					"@wrapper.settings.shiftType":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftList',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'ShiftListCtrl',
						templateUrl: 'wrapper/settings/shiftList.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftList.create',
			{
				url: '^/settings/shift-list/create',
				views:
				{
					"@wrapper.settings.shiftList":
					{
						controller: 'ShiftListFormCtrl',
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.shiftList.update',
			{
				url: '^/settings/shift-list/update/:id',
				views:
				{
					"@wrapper.settings.shiftList":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pump',
			{
				abstract: true,
				views:
				{
					"@wrapper.settings":
					{
						controller: 'PumpCtrl',
						templateUrl: 'wrapper/settings/pump.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pump.create',
			{
				url: '^/settings/pump/create',
				views:
				{
					"@wrapper.settings.pump":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		)
		
		.state
		(
			'wrapper.settings.pump.update',
			{
				url: '^/settings/pump/update/:id',
				views:
				{
					"@wrapper.settings.pump":
					{
						templateUrl: 'wrapper/settings/form.tpl.html'
					}
				}
			}
		);
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------

.directive
(
	'arGrid', function factory ($location, $state, Restangular, yii)
	{
		return {
			restrict: 'E',
			controller: function ($scope, $element, $attrs)
			{
				// watch state ----------------------------------------------
				$scope.isCreate = true;
				
				$scope.headTitle = 'Create';
				
				$scope.$on
				(
					'$stateChangeStart', function (event, state)
					{
						var name = state.name.split('.');
							name = name[name.length - 1];
						
						$scope.isCreate = name === 'create' ? true : false;
						
						$scope.headTitle = ($scope.isCreate ? 'Create' : 'Update');
					}
				);
				// ----------------------------------------------------------
				
				$scope.formsv = [];
				$scope.gridData = [];
				$scope.formData = {};
				$scope.columnDefs = [];
				$scope.totalServerItems = 0;
				$scope.selectedItemIndex = 0;
				$scope.model = Restangular.all($attrs.apiExt);
				$scope.pagingOptions = { pageSizes: [10, 20, 30], pageSize: 10, currentPage: 1 };
				
				$scope.onSelectRow = function (rowItem)
				{
					if (rowItem.config.selectedItems.length)
					{
						angular.forEach
						(
							$scope.formData, function (value, key)
							{
								switch (typeof $scope.formData[key])
								{
									case 'boolean':
										$scope.formData[key] = rowItem.entity[key] === '1' ? true : false;
									break;
									
									case 'number':
										$scope.formData[key] = parseInt(rowItem.entity[key], 10);
									break;
									
									default:
										$scope.formData[key] = rowItem.entity[key];
									break;
								}
							}
						);
						
						$scope.selectedItem = rowItem.rowIndex;
						
						$location.path($attrs.route + '/update/' + rowItem.entity.id);
					}
					else
					{
						$location.path($attrs.route + '/create');
					}
				};
				
				$scope.deselectItem = function ()
				{
					$scope.rest();
					
					$scope.gridOptions.selectItem ($scope.selectedItem, false);
					
					$location.path ($attrs.route + '/create');
				};
				
				$scope.updateTotalServerItems = function (pagNum, pagSiz, val)
				{
					if (typeof val === 'undefined')
					{
						$scope.model.one('numRows').get().then
						(
							function (data)
							{
								$scope.totalServerItems = parseInt(data.numRows, 10);
							}
						);
					}
					else
					{
						$scope.totalServerItems = val;
					}
					
					var lastPage = Math.ceil(val / $scope.pagingOptions.pageSize);
					
					if (!lastPage)
					{
						lastPage = 1;
					}
					
					if (lastPage < $scope.pagingOptions.currentPage)
					{
						$scope.pagingOptions.currentPage = lastPage;
						
						return;
					}
					
					$scope.getList(pagNum, pagSiz);
				};
				
				$scope.getList = function (pagNum, pagSiz)
				{
					var offset = (pagNum - 1) * pagSiz;
					
					$scope.model.getList
					(
						{
							offset: offset < 0 ? 0 : offset,
							limit: pagSiz
						}
					)
					.then
					(
						function (data)
						{
							$scope.gridData = angular.isArray(data) ? data : [];
						}
					);
				};
				
				$scope.rest = function ()
				{
					angular.forEach
					(
						$scope.metaData.cols, function (value, key)
						{
							switch (value.type)
							{
								case 'integer':
									switch (value.size)
									{
										case 1:
											$scope.formData[key] = ((value.defaultValue === null) ? false : (value.defaultValue === 1 ? true : false));
										break;
										
										default:
											$scope.formData[key] = (value.defaultValue === null ? NaN : parseFloat(value.defaultValue, 10));
										break;
									}
								break;
								
								default:
									$scope.formData[key] = (value.defaultValue === null ? '' : value.defaultValue);
								break;
							}
						}
					);
				};
				
				$scope.gridOptions =
				{
					data: 'gridData',
					columnDefs: 'columnDefs',
					totalServerItems: 'totalServerItems',
					pagingOptions: $scope.pagingOptions,
					afterSelectionChange: $scope.onSelectRow,
					enablePaging: true,
					showFooter: true,
					multiSelect: false,
					keepLastSelected: false,
					jqueryUIDraggable: true
				};
				
				$scope.$watch
				(
					'pagingOptions', function (newVal, oldVal)
					{
						if (newVal !== oldVal)
						{
							$scope.deselectItem();
							
							if (newVal.currentPage !== oldVal.currentPage)
							{
								$scope.getList(newVal.currentPage, newVal.pageSize);
							}
							else
							{
								$scope.updateTotalServerItems(newVal.currentPage, newVal.pageSize, $scope.totalServerItems);
							}
						}
					}, true
				);
				
				$scope.deleteItem = function (row)
				{
					row.entity.options().then
					(
						function ()
						{
							$scope.deselectItem();
							
							$scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.totalServerItems - 1);
						}
					);
				};
				
				yii.then
				(
					function (res)
					{
						$scope.metaData = res[$attrs.metaData];
						
						angular.forEach
						(
							$scope.metaData.cols, function (value, key)
							{
								if (!value.autoIncrement)
								{
									$scope.columnDefs.push
									({
										field: key,
										displayName: value.label
									});
								}
								else
								{
									delete $scope.metaData.cols[key];
								}
							}
						);
						
						$scope.columnDefs.push
						({
							field: '#',
							cellTemplate: '<a style="line-height: 32px; margin-left: 5px;" class="red" ng-click="deleteItem(row)"><i class="icon-trash bigger-130"></i></a>'
						});
						
						$scope.rest();
						
						$scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize);
					}
				);
				
				$scope.submit = function (data)
				{
					if ($scope.isCreate)
					{
						var post = angular.copy(data);
						
						angular.forEach
						(
							post, function (val, key)
							{
								if (typeof val === 'boolean')
								{
									post[key] = val ? 1 : 0;
								}
							}
						);
						
						$scope.model.post(post).then
						(
							function ()
							{
								$scope.rest();
								
								$scope.updateTotalServerItems($scope.pagingOptions.currentPage, $scope.pagingOptions.pageSize, $scope.totalServerItems + 1);
							}
						);
					}
					else
					{
						var item = Restangular.copy($scope.gridData[$scope.selectedItem]);
						
						angular.forEach
						(
							data, function (val, key)
							{
								switch (typeof val)
								{
									case 'boolean':
										item[key] = val ? '1' : '0';
									break;
									
									default:
										item[key] = val;
									break;
								}
							}
						);
						
						item.put().then
						(
							function (rest)
							{
								angular.copy(item, $scope.gridData[$scope.selectedItem]);
								
								$scope.deselectItem();
							}
						);
					}
				};
			}
		};
	}
)

//---------------------------------------------------------
// Module 'Settings' Controller
//---------------------------------------------------------
.controller
(
	'SettingsCtrl', function SettingsCtrl ($scope)
	{
		
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Pouring Type Controller
//---------------------------------------------------------
.controller
(
	'PouringTypeCtrl', function PouringTypeCtrl ($scope, Restangular, $location, yii)
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Zone Controller
//---------------------------------------------------------
.controller
(
	'ZoneCtrl', function ZoneCtrl ()
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Supplier Controller
//---------------------------------------------------------
.controller
(
	'SupplierCtrl', function SupplierCtrl ()
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Pump Controller
//---------------------------------------------------------
.controller
(
	'PumpCtrl', function PumpCtrl ()
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Concrete Type Controller
//---------------------------------------------------------
.controller
(
	'ConcreteTypeCtrl', function ConcreteTypeCtrl ($scope)
	{
		$scope.restValues = function ()
		{
			$scope.formData['flow_norm_from'] = '';
			$scope.formData['flow_norm_to'] = '';
			$scope.formData['flow_acpt_from'] = '';
			$scope.formData['flow_acpt_to'] = '';
			$scope.formData['slamp_norm_from'] = '';
			$scope.formData['slamp_norm_to'] = '';
			$scope.formData['slamp_acpt_from'] = '';
			$scope.formData['slamp_acpt_to'] = '';
		};
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Shift Types Controller
//---------------------------------------------------------
.controller
(
	'ShiftTypeCtrl', function ShiftTypeCtrl ()
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



//---------------------------------------------------------
// Shift Types Controller
//---------------------------------------------------------
.controller
(
	'ShiftListCtrl', function ShiftListCtrl ()
	{
	}
)
//---------------------------------------------------------
// End
//---------------------------------------------------------



.controller
(
	'ShiftListFormCtrl', function ShiftListFormCtrl ($scope)
	{
	}
);