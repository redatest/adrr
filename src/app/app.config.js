var appConfig = new function()
{
	this.loginRoute = '/login';
	
	this.defaultRoute = '/dashboard';
	
	this.defaultState = 'wrapper.dashboard';
	
	this.localUrl = '../yii';
	
	this.remoteUrl = 'yii';
	
	this.getYiiUrl = function()
	{
		return document.URL.indexOf ('//localhost') > 0 ? this.localUrl : this.remoteUrl;
	}
	
	this.yiiUrl = this.getYiiUrl();

	this.restfulApiBaseUrl = this.yiiUrl;
}