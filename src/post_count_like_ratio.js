class Post_Count_Like_Ratio {

	static init(){
		this.PLUGIN_ID = "post_count_like_ratio";
		this.settings = {};

		let location_check = (

			pb.data("route").name == "search_results" ||
			pb.data("route").name == "conversation" ||
			pb.data("route").name == "list_messages" ||
			pb.data("route").name == "thread" ||
			pb.data("route").name == "list_posts" ||
			pb.data("route").name == "permalink" ||
			pb.data("route").name == "all_recent_posts" ||
			pb.data("route").name == "recent_posts" ||
			pb.data("route").name == "posts_by_ip"

		);

		if(location_check){
			this.setup();

			$(this.ready.bind(this));
		}
	}

	static ready(){
		this.add_ratio();

		pb.events.on("afterSearch", this.add_ratio.bind(this));
	}

	static setup(){
		let plugin = pb.plugin.get(this.PLUGIN_ID);

		if(plugin && plugin.settings){
			this.settings = plugin.settings;
		}
	}

	static add_ratio(){
		let $mini_profiles = $(".item .mini-profile");

		if(!$mini_profiles.length){
			return;
		}

		$mini_profiles.each((index, item) => {
			let $mini_profile = $(item);
			let $elem = $mini_profile.find(".post-count-like-ratio");

			if($elem.length == 0){
				return;
			}

			let likes = $elem.attr("data-user-like-count");
			let posts = $elem.attr("data-user-post-count");

			let likes_int = parseInt(likes.replace(/\D/g, ""), 10);
			let posts_int = parseInt(posts.replace(/\D/g, ""), 10);

			let ratio = (likes_int / posts_int).toFixed(2);

			$elem.html("<span title=\"" + pb.text.escape_html(likes) + "\">Likes</span> to <span title=\"" + pb.text.escape_html(posts) + "\">posts</span> ratio: " + ratio);
		});
	}

}