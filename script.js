let posts = [
    {   
        "profile-image": './img/profile0.jpg',
        "author": 'sarah_lang',
        "time": '2 Std.',
        "image": './img/1.jpg',
        "likes": 32,
        "isLiked": false,
        "description": 'Wunderschöner Tag an der nördlichsten Spitze Neuseelands',
        "location": 'Cape Reinga, New Zealand',
        "comments": ['<b>lisa.p</b>  Wow, wunderschöne Landschaft', '<b>leon_a</b>  Sieht sehr cool aus'],
    },
    {   
        "profile-image": './img/profile2.jpg',
        "author": 'travelling_newzealand',
        "time": '5 Std.',
        "image": './img/2.jpg',
        "likes": 132,
        "isLiked": false,
        "description": 'You can watch beautiful seals at Golden Bay in the South Island',
        "location": 'Golden Bay, New Zealand',
        "comments": ['<b>backpacker_guy</b>  Very cool spot, I can recommend'],      
    },
    {
        "profile-image": './img/profile3.jpg',
        "author": 'Surferguy',
        "time": '12 Std.',
        "image": './img/3.jpg',
        "likes": 57,
        "isLiked": false,
        "description": 'Surfin at the beach',
        "location": 'Bali',
        "comments": ['<b>arne_m</b>  What a lovely sunset', '<b>max_p</b>  Cool spot to surf', '<b>mia</b>  Stunning!'],    
    },
    {   
        "profile-image": './img/profile4.jpg',
        "author": 'city-blog',
        "time": '1 Tag',
        "image": './img/4.jpg',
        "likes": 55,
        "isLiked": false,
        "description": 'Erkunde die wundervolle Metropole Auckland',
        "location": 'Auckland',
        "comments": ['<b>luca_g</b>  Ich kann es nur empfehlen'],
    },
    {
        "profile-image": './img/profile5.png',
        "author": 'Kochwelt',
        "time": '2 Tage',
        "image": './img/5.jpg',
        "likes": 257,
        "isLiked": false,
        "description": 'Neues Rezept zum kochen: Gnocchi mit Rucola-Zitronenbutter',
        "location": '',
        "comments": ['<b>fritz_a</b>  Lecker', '<b>Laura</b>  Werden wir nachkochen!'],  
    }
];

load();

function render() {
    let content = document.getElementById("postcontainer");
    content.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        let likebutton = './img/heart.png';

        if (post['isLiked']) {
            likebutton = './img/red-heart.png'
        }
        content.innerHTML += renderTemplate(post, i, likebutton);
        commentLoop(i, post);
    }
}

function renderTemplate(post, i, likebutton) {
    return /*html*/`
    <div class="posts">
        <div class="post-header">
            <img class="profile-img" src="${post['profile-image']}">
            <div class="author-time-location">
                <div class="author-time">
                    <div style="font-weight: bold;" class="author">${post['author']}&nbsp;&bull;&nbsp;</div>
                    <div>${post['time']}</div>
                </div>
                <div class="post-location">${post['location']}</div>
            </div>
            <img src="./img/more-options.png" alt="Options Icon" class="options-img">
        </div>
        <img class="post-img" src="${post['image']}">
        <div class="below-picture">
            <div class="buttons-below-picture">
                <div class="left-buttons">
                    <img src="${likebutton}" onclick="like(${i})" class="below-img-icon left-icons">
                    <img src="./img/chat.png" class="below-img-icon left-icons">
                    <img src="./img/send.png" class="below-img-icon left-icons">
                </div>
                <img src="./img/save.png" class="below-img-icon">
            </div>
            <div class="amount-likes">
                <p style="font-weight: bold;">Gefällt ${post['likes']} Mal</p>
            </div>
            <span class="description">
                <b>${post['author']}</b>&nbsp;${post['description']}
            </span>
            <div id="existing-comments${i}" class="existing-comments"></div>
            <div class="my-comment">
                <textarea placeholder="Kommentieren ..." id="input${i}" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'></textarea>
                <span class="comment-button" onclick="addComment(${i})">Posten</span>
            </div>
            <div class="separator"></div>
        </div>
    </div>
    `;
}

function addComment(index) {
    let input = document.getElementById(`input${index}`).value;
    let fixedName = "andreas_chillitzer";
    let commentWithFixedName = `<b>${fixedName}</b> ${input}`;
    posts[index]['comments'].push(commentWithFixedName);
    render();
    save();
    input.value = '';
}

function like(index) {
    if (posts[index]['isLiked']) {
        posts[index]['likes']--;
        posts[index]['isLiked'] = false;    
    } else {
        posts[index]['likes']++;
        posts[index]['isLiked'] = true;
    }
    render()
    save();
}

function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem(posts, postsAsText);
}

function load() {
    let postsAsText = localStorage.getItem(posts);
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}

function commentLoop(i, post) {
    let existingComments = document.getElementById(`existing-comments${i}`);

        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];
            existingComments.innerHTML += /*html*/`

                <div>${comment}</div>
            `;
        }
}