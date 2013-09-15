var appConfig = new function()
{
	this.loginRoute = '/login';
	
	this.defaultRoute = '/dashboard';
	
	this.defaultState = 'wrapper.dashboard';
<<<<<<< HEAD
	
	this.localUrl = '../yii';
	
	this.remoteUrl = 'yii';
	
	this.getYiiUrl = function()
	{
		return document.URL.indexOf ('//localhost') > 0 ? this.localUrl : this.remoteUrl;
	}
	
	this.yiiUrl = this.getYiiUrl();
=======

//Aladdin yii url stuff
	this.localUrl = '../yii';
	this.remoteUrl = 'yii';
	this.getYiiUrl = function(){
		return document.URL.indexOf('//localhost/')>0?this.localUrl:this.remoteUrl;
	}
	this.yiiUrl = this.getYiiUrl();
///Aladdin
>>>>>>> cbb2b8ac391e3f642f9bab8520d5cb8f9eeab910

	this.restfulApiBaseUrl = this.yiiUrl;
}