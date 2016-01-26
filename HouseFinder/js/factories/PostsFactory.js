app.factory('PostsRepository', [
    '$http', '$q', function ($http, $q) {
        var serviceBase = 'http://www.housefinderwebapi.cedricandco.com/';
        var postServiceFactory = {};

        var _getDataLoadPost = function (criteria, start, count) {
            //var params = {
            //    CurrentType: scope.currentSelectedLeftPanel,
            //    StartIndex: start,
            //    Count: count,
            //    CurrentType2: scope.loadType,
            //    UserId: scope.userId
            //};

            // todo remove
            params = {
                ConnectedUser: "",
                CurrentType2: "all",
                ReservationStart: "",
                ReservationEnd: "",
                StartIndex: 0,
                Count: 10
            }

            if (criteria != null) {
                params.ModuleType = criteria.moduleType;
                params.SubModules = criteria.selectedSubModules;
                params.Values = criteria.selectedValues;
                params.PropertyValues = criteria.propertyValues;
                // Reservation Date
                params.FilterByReservationDate = criteria.filterByReservationDate;
                params.ReservationStart = criteria.reservationStart;
                params.ReservationEnd = criteria.reservationEnd;
                // Created Date
                params.FilterByCreatedDate = criteria.filterByCreatedDate;                
                params.PostCreationDateStart = criteria.postCreationDateStart;
                params.PostCreationDateEnd = criteria.postCreationDateEnd;
                // Reservation Price
                params.FilterByReservationPrice = criteria.filterByReservationPrice;
                params.ReservationMinPrice = criteria.reservationMinPrice;
                params.ReservationMaxPrice = criteria.reservationMaxPrice;
            }

            return params;
        }



        var _deletePost = function (post) {
            return $http.post(
                serviceBase + 'api/Posts/DeletePost',
                post
            );
        }

        var _deletePicture = function (picture) {
            return $http.post(
                serviceBase + 'api/Posts/RemovePictureToPost',
                picture
            );
        }

        var _loadCommentsForPost = function (postId, start, count) {

            var params = { postId: postId, start: start, count: count };

            return $http.get(
                serviceBase + 'api/Posts/LoadComment',
                { params: params }
            );
        }

        var _loadEvaluationsForPost = function (postId, start, count) {
            var params = { postId: postId, start: start, count: count };

            return $http.get(
                serviceBase + 'api/Posts/LoadPostEvaluation',
                { params: params }
            );
        }

        var _currentlyLoading = false;
        var _loadPost = function (params) {
            if (!_currentlyLoading) {
                _currentlyLoading = true;
                console.log(params);
                return $http.post(serviceBase + 'api/Posts/SearchPost', params).then(function(response) {
                    _currentlyLoading = false;

                    return response;
                });
            } else {
                return $q.reject(null);
            }
        }

        var _upVotePost = function (post) {
            var params = { postId: post.id };

            return $http.get(
                serviceBase + 'api/Posts/UpVotePost',
                { params: params }
            );
        }

        var _commentPost = function (post, text) {
            var model = {
                Post: post,
                Text: text
            };

            return $http.post(
                serviceBase + 'api/Posts/CommentPost',
                model
            );
        }

        var _downVotePost = function (post) {
            var params = { postId: post.id };

            return $http.get(
                serviceBase + 'api/Posts/DownVotePost',
                { params: params }
            );
        }

        var _getPostById = function (id, execute) {
            var params = { postId: id };

            return $http.get(
                serviceBase + 'api/Posts/GetPostById',
                { params: params }
            );
        }

        var _sharePost = function (id, email) {
            var params = { postId: id, email: email };

            return $http.get(
                serviceBase + 'api/Posts/SharePost',
                { params: params }
            );
        }

        var _createPost = function (model) {
            return $http.post(serviceBase + "api/Posts/CreatePost", model);
        }

        var _editPost = function (model) {
            return $http.put(serviceBase + "api/Posts/UpdatePost", model);
        }

        var _createEvaluation = function (model) {
            return $http.post(serviceBase + "api/Posts/CreateEvaluation", model);
        }

        var _getCountInformation = function () {
            return $http.get(serviceBase + "api/Posts/GetCountInformation");
        }

        var _editcommentPost = function (comment, text) {
            var model = {
                Comment: comment,
                Text: text
            };

            return $http.put(
                serviceBase + 'api/Posts/EditComment',
                model
            );
        }


        var _deletecommentPost = function (comment) {

            return $http.delete(
                serviceBase + 'api/Posts/DeleteComment/' + comment.id
            );
        }

        //var _uploadPicture = function (file, postUniqueId) {
        //    return Upload.upload({
        //        url: serviceBase + 'api/Posts/AddPictureToPost',
        //        fields: { 'uniqueId': postUniqueId },
        //        file: file
        //    });
        //}

        //postServiceFactory.uploadPicture = _uploadPicture;
        postServiceFactory.createPost = _createPost;
        postServiceFactory.editPost = _editPost;
        postServiceFactory.createEvaluation = _createEvaluation;
        postServiceFactory.loadCommentsForPost = _loadCommentsForPost;
        postServiceFactory.loadEvaluationsForPost = _loadEvaluationsForPost;
        postServiceFactory.loadPost = _loadPost;
        postServiceFactory.commentPost = _commentPost;
        postServiceFactory.upVotePost = _upVotePost;
        postServiceFactory.downVotePost = _downVotePost;
        postServiceFactory.deletePost = _deletePost;
        postServiceFactory.deletePicture = _deletePicture;
        postServiceFactory.getPostById = _getPostById;
        postServiceFactory.getDataLoadPost = _getDataLoadPost;
        postServiceFactory.getCountInformation = _getCountInformation;
        postServiceFactory.editCommentPost = _editcommentPost;
        postServiceFactory.deleteCommentPost = _deletecommentPost;
        postServiceFactory.sharePost = _sharePost;

        return postServiceFactory;
    }
]);