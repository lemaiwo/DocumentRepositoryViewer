sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../service/RepoService",
	"sap/ui/model/json/JSONModel"
], function (Controller, RepoService, JSONModel) {
	"use strict";

	return Controller.extend("be.wl.DocumentRepositoryViewer.controller.App", {
		onInit: function () {
			this.loadFiles();
		},
		loadFiles: async function () {
			var result = await RepoService.getFiles();
			var files = result.objects.map(file => ({
				name: file.object.properties["cmis:name"].value,
				id: file.object.properties["cmis:objectId"].value,
				isImage: file.object.properties["cmis:contentStreamMimeType"].value.indexOf("image") > -1 ? true : false
			}));
			this.getView().setModel(new JSONModel({
				files: files
			}), "repo");
			return files;
			// return RepoService.getFiles().then((result) => {
			// 	var files = result.objects.map(file => ({
			// 		name: file.object.properties["cmis:name"].value,
			// 		id: file.object.properties["cmis:objectId"].value,
			// 		isImage:file.object.properties["cmis:contentStreamMimeType"].value.indexOf("image") > -1 ? true:false
			// 	}));
			// 	this.getView().setModel(new JSONModel({
			// 		files: files
			// 	}), "repo");
			// 	return files;
			// });
		},
		onUploadImage: async function (oEvent) {
			var file = oEvent.getParameter("files")[0];
			// RepoService.uploadFile(file).then(() => this.loadFiles());
			await RepoService.uploadFile(file);
			await this.loadFiles();
		},
		onDeleteImage: async function (oEvent) {
			// RepoService.deleteFile(oEvent.getSource().getBindingContext("repo").getProperty("name")).then(() => this.loadFiles());
			await RepoService.deleteFile(oEvent.getSource().getBindingContext("repo").getProperty("name"));
			await this.loadFiles();
		}
	});
});