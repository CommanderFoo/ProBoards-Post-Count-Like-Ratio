"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Post_Count_Like_Ratio = function () {
	function Post_Count_Like_Ratio() {
		_classCallCheck(this, Post_Count_Like_Ratio);
	}

	_createClass(Post_Count_Like_Ratio, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "post_count_like_ratio";
			this.settings = {};

			var location_check = pb.data("route").name == "search_results" || pb.data("route").name == "conversation" || pb.data("route").name == "list_messages" || pb.data("route").name == "thread" || pb.data("route").name == "list_posts" || pb.data("route").name == "permalink" || pb.data("route").name == "all_recent_posts" || pb.data("route").name == "recent_posts" || pb.data("route").name == "posts_by_ip";

			if (location_check) {
				this.setup();

				$(this.ready.bind(this));
			}
		}
	}, {
		key: "ready",
		value: function ready() {
			this.add_ratio();

			pb.events.on("afterSearch", this.add_ratio.bind(this));
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.settings = plugin.settings;
			}
		}
	}, {
		key: "add_ratio",
		value: function add_ratio() {
			var $mini_profiles = $(".item .mini-profile");

			if (!$mini_profiles.length) {
				return;
			}

			$mini_profiles.each(function (index, item) {
				var $mini_profile = $(item);
				var $elem = $mini_profile.find(".post-count-like-ratio");

				if ($elem.length == 0) {
					return;
				}

				var likes = $elem.attr("data-user-like-count");
				var posts = $elem.attr("data-user-post-count");

				var likes_int = parseInt(likes.replace(/\D/g, ""), 10);
				var posts_int = parseInt(posts.replace(/\D/g, ""), 10);

				var ratio = (likes_int / posts_int).toFixed(2);

				$elem.html("<span title=\"" + pb.text.escape_html(likes) + "\">Likes</span> to <span title=\"" + pb.text.escape_html(posts) + "\">posts</span> ratio: " + ratio);
			});
		}
	}]);

	return Post_Count_Like_Ratio;
}();


Post_Count_Like_Ratio.init();