sap.ui.define([
	"./Service"
], function (Service) {
	"use strict";

	var RepoService = Service.extend("be.wl.DocumentRepositoryViewer.service.RepoService", {
		constructor: function () {},
		uploadFile: function (file) {
			var form = new FormData();
			form.append("datafile", file);
			form.append("cmisaction", "createDocument");
			form.append("propertyId[0]", "cmis:objectTypeId");
			form.append("propertyValue[0]", "cmis:document");
			form.append("propertyId[1]", "cmis:name");
			form.append("propertyValue[1]", file.name);
			
			return this.http("/cmisproxysap/cmis/json/0d1793f590788bc65bc9b3c5/root").post(false, form);
		},
		deleteFile: function (name) {
			var form = new FormData();
			form.append("cmisaction", "delete"); 
			
			return this.http("/cmisproxysap/cmis/json/0d1793f590788bc65bc9b3c5/root/" + name).post(false, form);
		},
		getFiles: function () {
			return this.http("/cmisproxysap/cmis/json/0d1793f590788bc65bc9b3c5/root/").get();
		}
	});
	return new RepoService();
});