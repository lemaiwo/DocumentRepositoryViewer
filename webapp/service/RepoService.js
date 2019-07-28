sap.ui.define([
	"./HTTPService"
], function (HTTPService) {
	"use strict";

	var RepoService = HTTPService.extend("be.wl.DocumentRepositoryViewer.service.RepoService", {
		constructor: function () {},
		uploadFile: function (file) {
			var form = new FormData();
			form.append("datafile", file);
			form.append("cmisaction", "createDocument");
			form.append("propertyId[0]", "cmis:objectTypeId");
			form.append("propertyValue[0]", "cmis:document");
			form.append("propertyId[1]", "cmis:name");
			form.append("propertyValue[1]", file.name);

			return this.getRepoId().then(function (ReposId) {
			return this.http("/cmisproxysap/cmis/json/"+ReposId+"/root").post(false, form);
			}.bind(this));
		},
		deleteFile: function (name) {
			var form = new FormData();
			form.append("cmisaction", "delete");

			return this.getRepoId().then(function (ReposId) {
				return this.http("/cmisproxysap/cmis/json/"+ReposId+"/root/" + name).post(false, form);
			}.bind(this));
		},
		getFiles: function () {
			return this.getRepoId().then(function (ReposId) {
				return this.http("/cmisproxysap/cmis/json/" + ReposId + "/root/").get();
			}.bind(this));
		},
		getRepoId: function () {
			if (this.RepoId) {
				return Promise.resolve(this.RepoId);
			}
			return this.getRepoInfo().then(function (info) {
				for (var field in info) {
					this.ReposId = info[field].repositoryId;
					break;
				}
				return this.ReposId;
			}.bind(this));
		},
		getRepoInfo: function () {
			return this.http("/cmisproxysap/cmis/json").get();
		}
	});
	return new RepoService();
});