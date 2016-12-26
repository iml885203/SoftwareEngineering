/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//顯示成員清單
	getC3Data: function(req, res){
		var datas = [];
		let dataTitles = [];

		switch(req.query.target){
			case 'tag':
				dataTitles = Attr.issueTag ; break;
			case 'state':
				dataTitles = Attr.issueState ; break;
			case 'priority':
				dataTitles = Attr.issuePriority ; break;
			default:
				break;
		}
		if(dataTitles.length === 0){
			datas.push(['安安', 13]);
			datas.push(['參數錯誤喔', 87]);
			return res.json(datas);
		}

		Issue.find({
			belongProject: req.params.id,
		})
		.then((issues) => {
			dataTitles.forEach((dataTitle) => {
				var titleCounter = 0;
				issues.forEach((issue) => {
					if(issue[req.query.target] === dataTitle){
						titleCounter++;
					}
				});
				datas.push([dataTitle, titleCounter]);
			});

			return res.json(datas);
		});
	},
};
