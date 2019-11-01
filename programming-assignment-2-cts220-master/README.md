# CSE264 Project 2: Building a REST API with MongoDB

### REST API
Comments are an array within the Schema for Post.

* PUT - /posts/[post_id]
  * This should accept a JSON body and update the post identified by [post_id]. If this post does not exist, it should create it. *replaces the current post with this new JSON body*

* PUT - /posts/[post_id]/comments/[comment_id]
  * This should accept a JSON body and update the comment identified by [comment_id]. If this comment does not exist, it should create it. *takes the body for the new comment as input and replaces the existing comment with it*



