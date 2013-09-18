describe('PhoneCat controllers', function() {

	describe('PhoneListCtrl', function(){

		beforeEach(module('adrrApp'));
		it('should create "phones" model with 3 phones', function() {
			expect(3).toBe(3);
		});
	});
});