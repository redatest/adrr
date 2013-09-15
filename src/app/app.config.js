var appConfig = new function()
{
	this.loginRoute = '/login';
	
	this.defaultRoute = '/dashboard';
	
	this.defaultState = 'wrapper.dashboard';
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b
	
	this.localUrl = '../yii';
	
	this.remoteUrl = 'yii';
	
	this.getYiiUrl = function()
	{
		return document.URL.indexOf ('//localhost') > 0 ? this.localUrl : this.remoteUrl;
	}
	
	this.yiiUrl = this.getYiiUrl();
<<<<<<< HEAD
=======
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
>>>>>>> 6398a81c96a3aacc992ae61769144802b2a0961b

	this.restfulApiBaseUrl = this.yiiUrl;
}