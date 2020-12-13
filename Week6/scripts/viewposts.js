(() => {
	const db = firebase.database();
	const tweetsDB = db.ref('/tweets');
	const postContainer = document.getElementById('post-container');
	const newPost = document.getElementById('new-post');
	const newPostText = document.getElementById('new-post-text');
	const profileName = document.getElementById("profile-name");
	const posts = document.getElementById("profile-posts-count");
	const reactions = document.getElementById("profile-likes-count");
	const loader = document.getElementById("loader");
	const post = data => {
		const state = data.val();

		return `<figure class="profile-avatar post-section-avatar">
              <img src="images/avatar.png" alt="BP" class="profile-image">
          </figure>
			  <div class="post-content">
				  <div class="post-author">
					  <h3 class="post-author-name">${state.username}</h3>
					  <span class="post-delimiter fa fa-circle"></span>
					  <span class="post-date">${time_ago(new Date(state.date))}</span>
				  </div>
				  <p class="post-text">${state.message}</p>
				  <div class="post-footer">
					  <div class="post-reaction">
						  <button class="far fa-thumbs-up like-btn" data-id="${data.key}"></button>
						  <span class="post-likes" id="likes-${data.key}">${state.likes}</span>
					  </div>
	
					  <div class="post-reaction dislike-container">
						  <button class="far fa-thumbs-down dislike-btn" data-id="${data.key}"></button>
						  <span class="post-dislikes" id="dislikes-${data.key}">${state.dislikes}</span>
					  </div>
				  </div>
			  </div>
			  <div class="post-close">
				  <button class="post-close fa fa-times" data-id="${data.key}"></button>
			  </div>`;
	};

	newPost.addEventListener('submit', event => {
        // Logic when posting new tweet
		tweet.post(newPostText.value);

	});

	firebase.auth().onAuthStateChanged(user => {
		// Update profile posts information

		var userId = firebase.auth().currentUser.uid;
		let tweets = 0;
		let likes = 0;
		firebase.database().ref('/users/' + userId).on("value", (data) => {console.log(data.val());
			console.log(data.val()["tweets"]);
			tweets = data.val()["tweets"];
			likes = data.val()["likes"];
			posts.innerText = tweets;
			reactions.innerText = likes;
			profileName.innerText = user.displayName;
		});
	});

	tweetsDB.on('child_added', data => {
		// return true;
		// Logic when new tweet is added

		if (!validateUser()) {
			return;
		}
		loader.style.display = "none";

		let divPost = document.createElement("DIV");
		divPost.classList.add("post");
		divPost.innerHTML = post(data);
		postContainer.appendChild(divPost)

		divPost.querySelector(".like-btn").addEventListener("click", event => {
			tweet.incrementLikes(event.target.getAttribute("data-id"));
			event.preventDefault();
		})

		divPost.querySelector(".dislike-btn").addEventListener("click", event => {
			tweet.incrementDislikes(event.target.getAttribute("data-id"));
			event.preventDefault();
		})

		divPost.querySelector(".post-close").addEventListener("click", event => {
			tweet.delete(event.target.getAttribute("data-id"));
			document.getElementById("post-container").removeChild(event.target.parentNode.parentNode);
			event.preventDefault();
		})
	});

	tweetsDB.on('child_changed', data => {
		// Like / Dislike logic here
		let reactionLike = document.getElementById(`likes-${data.key}`);
		let reactionDislike = document.getElementById(`dislikes-${data.key}`);
		reactionLike.innerHTML = data.val().likes;
		reactionDislike.innerHTML = data.val().dislikes;

	});

	function validateUser() {
		// console.log(firebase.auth().currentUser)
		if (!firebase.auth().currentUser) {
			// user is not logged in
			window.location = 'index.html?error=accessDenied';
			return false;
		}

		return true;
	}

	// Helper function for converting time from milliseconds to human readable format
	function time_ago(time) {
		const time_formats = [
			[60, 'seconds', 1], // 60
			[120, '1 minute ago', '1 minute from now'], // 60*2
			[3600, 'minutes', 60], // 60*60, 60
			[7200, '1 hour ago', '1 hour from now'], // 60*60*2
			[86400, 'hours', 3600], // 60*60*24, 60*60
			[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
			[604800, 'days', 86400], // 60*60*24*7, 60*60*24
			[1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
			[2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
			[4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
			[29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
			[58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
			[2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
			[5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
			[58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
		];
		let seconds = (+new Date() - time) / 1000,
			token = 'ago',
			list_choice = 1;

		if (seconds === 0) {
			return 'Just now'
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			token = 'from now';
			list_choice = 2;
		}
		let i = 0,
			format;
		while (format = time_formats[i++])
			if (seconds < format[0]) {
				if (typeof format[2] === 'string')
					return format[list_choice];
				else
					return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
			}
		return time;
	}
})();