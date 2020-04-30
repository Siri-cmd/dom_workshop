function dataFromDB() {
    return [
    { 
        id: "1",
        title: "JS is amazing",
        body: "JS is amazing and so easy to learn. I like it a lot!",
        author: "CB",
    },
    {
        id: "2",
        title: "DOM manipulation is easy",
        body:"DOM Manipulation using JS is straightforward and fun! You can intercept user actions and change things in the HTML and also in CSS.",
        author: "Anonymous",
    },
    {
        id: "3",
        title: "CSS is nice",
        body:"To style your HTML page is so much fun! I like playing with colos and images!",
        author: "AB",
    }
 ];
}

var $comments = document.querySelector('.comments');
var dbComments = dataFromDB();

function createCommentElement(id, title, comment, author) {
    var $article = document.createElement('article');
    console.dir($article);

    var $header = document.createElement('header');
    $header.innerText = title;
    $article.appendChild($header);

    var $p = document.createElement('p');
    $p.innerText = comment;
    $p.classList.add('comment');
    $article.appendChild($p);

    var $footer = document.createElement('footer');
    $footer.innerText = author;
    $article.appendChild($footer);

    var $delButton = document.createElement('button');
    $delButton.setAttribute("comment_id", id);
    $delButton.innerText = "Delete";
    $delButton.addEventListener('click', onDeleteComment);
    $article.appendChild($delButton);

    var $likeButton = document.createElement('button');
    $likeButton.setAttribute("comment_id", id);
    $likeButton.innerText = "Like";
    $likeButton.addEventListener('click', onLikeComment);
    $article.appendChild($likeButton);

    return $article;
}

function onLikeComment(event) {
    console.log(event); 
    console.log("Liked comment on position " + getCommentIndex(this.getAttribute("comment_id"))); 

}

function onDeleteComment(event) {
    console.log(event);

    console.log("Deleted comment with id " + this.getAttribute("comment_id")); 
    var commentIndex = getCommentIndex(this.getAttribute("comment_id"));
    dbComments.splice(commentIndex, 1);
    displayComments(dbComments); 
}

function getCommentIndex(searchedId) { 
    var x;
    for (var i = 0; i<dbComments.length; i++) {
        if(dbComments[i].id === searchedId) {
            x = i;
            break;
        }
    }
    return x;
}


function displayComments(commentsList) {
    while($comments.firstChild) {
        $comments.firstChild.remove();
    }

    for (var i = 0; i < commentsList.length; i++) {
        var comment = commentsList[i];

        var $article = createCommentElement(comment.id, comment.title, comment.body, comment.author);
       
        $comments.appendChild($article);
    }
}

var $title = document.querySelector('input[name="title"]');
var $comment = document.querySelector('textarea[name="comment"]');
var $author = document.querySelector('input[name="author"]');

function addComment(event) {
    console.log('add comment');
    event.preventDefault();
    console.dir(event);
    console.log($title.value);
    console.log($comment.value);
    console.log($author.value);

    
    var $article = createCommentElement("test", $title.value, $comment.value, $author.value);

    $comments.appendChild($article);
}

$searchInput = document.querySelector('input[name="search"]');

function onSearch(event) {
    console.log(event);
    console.log($searchInput.value);
}

function onSearchInputChange(event) {
    console.log(event);
    console.log($searchInput.value);
  }

document.addEventListener('DOMContentLoaded', function () {
    console.log('document is loaded');
    
    console.log(dbComments);

    displayComments(dbComments);

    var $form = document.querySelector('form');
    $form.addEventListener('submit', addComment);

    $searchButton = document.querySelector('.search');
    $searchButton.addEventListener('click', onSearch);

    $searchInput.addEventListener('input', onSearchInputChange)
});
